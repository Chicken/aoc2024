import { sum } from "../lib/array.ts";
import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";
import { CellMap } from "../lib/Map.ts";
import { Queue } from "../lib/Queue.ts";
import { CellSet } from "../lib/Set.ts";

// TRIGGER WARNING: THIS IS THE MOST HORRIBLE CODE, I'M SORRY
// needs a complete rewrite but time is a luxury
// I have written these before without all this complexity...
// but honestly I have no excuse for this...

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(""));

const grid = new Grid(input);

const regions = [];
const seen = new CellSet();

for (const [start, val] of grid) {
    // find a region
    if (seen.has(start)) continue;
    const region = new CellSet();
    let queue = new Queue<Cell>();
    queue.enqueue(start);
    const edges = new CellMap<[Cell, Cell][]>();
    while (queue.notEmpty()) {
        const cell = queue.dequeue()!;
        if (grid.get(cell) !== val) continue;
        if (seen.has(cell)) continue;
        seen.add(cell);
        region.add(cell);
        for (const neighbour of cell.neighbours()) {
            if (!grid.has(neighbour) || grid.get(neighbour) !== val) {
                const dir = neighbour.sub(cell);
                const vert1 = new Cell(
                    cell.r + (dir.r !== 0 ? (dir.r + 1) / 2 : 0),
                    cell.c + (dir.c !== 0 ? (dir.c + 1) / 2 : 0),
                );
                const vert2 = new Cell(
                    cell.r + (dir.r !== 0 ? (dir.r + 1) / 2 : 1),
                    cell.c + (dir.c !== 0 ? (dir.c + 1) / 2 : 1),
                );
                // track edges of region
                if (!edges.has(neighbour)) edges.set(neighbour, []);
                edges.get(neighbour)!.push([vert1, vert2]);
            }
            if (grid.has(neighbour)) queue.enqueue(neighbour);
        }
    }

    // split region edges into groups of connected edges
    const groups: CellSet[] = [];
    queue = new Queue<Cell>();
    for (const cell of edges.keys()) queue.enqueue(cell);
    const groupSeen = new CellSet();
    while (queue.notEmpty()) {
        const cell = queue.dequeue()!;
        if (groupSeen.has(cell)) continue;
        const queue2 = new Queue<Cell>();
        queue2.enqueue(cell);
        const group = new CellSet();
        while (queue2.notEmpty()) {
            const cell2 = queue2.dequeue()!;
            if (groupSeen.has(cell2)) continue;
            group.add(cell2);
            groupSeen.add(cell2);
            for (const neighbour of cell2.neighbours()) {
                if (edges.has(neighbour)) queue2.enqueue(neighbour);
            }
        }
        groups.push(group);
    }

    // count sides of region by summing sides inside each group
    let sides = 0;
    for (const group of groups) {
        // create an edge map of the current region
        const currentEdges = new CellMap<Cell[]>();
        for (const cell of group) {
            const verts = edges.get(cell)!;
            for (const [vert1, vert2] of verts) {
                if (!currentEdges.has(vert1)) currentEdges.set(vert1, []);
                if (!currentEdges.has(vert2)) currentEdges.set(vert2, []);
                currentEdges.get(vert1)!.push(vert2);
                currentEdges.get(vert2)!.push(vert1);
            }
        }

        // treat closed and open groups differently
        const isClosed = currentEdges.values().every((v) => v.length == 2);

        const seenVerts = new CellSet();
        while ([...currentEdges.keys()].some((vert) => !seenVerts.has(vert))) {
            // closed: find any unvisited vertex
            // open: find any unvisited vertex with only one edge
            const startVert = [...currentEdges.keys()].find((vert) =>
                !seenVerts.has(vert) && (isClosed || currentEdges.get(vert)!.length === 1)
            ) as Cell;
            let currentVert = startVert.copy();
            let dir = Cell.ZERO;
            // follow the edge
            do {
                seenVerts.add(currentVert);
                const verts = currentEdges.get(currentVert)!.filter((vert) => !seenVerts.has(vert));
                const vert = verts[0] ?? startVert;
                const newDir = vert.sub(currentVert);
                currentVert = vert;
                // direction change means a new side
                if (!newDir.equals(dir)) {
                    sides++;
                    dir = newDir;
                }
                // closed: continue until we reach the start vertex
                // open: continue until we reach a vertex with only one edge
            } while (isClosed ? !currentVert.equals(startVert) : currentEdges.get(currentVert)!.length !== 1);
        }
    }

    regions.push([region.size, sides]);
}

console.log(sum(regions.map(([s, p]) => s * p)));
