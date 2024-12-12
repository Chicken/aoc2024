import { sum } from "../lib/array.ts";
import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";
import { Queue } from "../lib/Queue.ts";
import { CellSet } from "../lib/Set.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(""));

const grid = new Grid(input);

const regions = [];
const seen = new CellSet();

for (const [start, val] of grid) {
    if (seen.has(start)) continue;
    const region = new CellSet();
    const queue = new Queue<Cell>();
    queue.enqueue(start);
    let perimeter = 0;
    while (queue.notEmpty()) {
        const cell = queue.dequeue()!;
        if (grid.get(cell) !== val) continue;
        if (seen.has(cell)) continue;
        seen.add(cell);
        region.add(cell);
        for (const neighbour of cell.neighbours()) {
            if (!grid.has(neighbour) || grid.get(neighbour) !== val) perimeter++;
            if (grid.has(neighbour)) queue.enqueue(neighbour);
        }
    }
    regions.push([region.size, perimeter]);
}

console.log(sum(regions.map(([s, p]) => s * p)));
