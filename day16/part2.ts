import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";
import { CellSet } from "../lib/Set.ts";

const input = Deno.readTextFileSync("input").trim();
const grid = new Grid(input);
const start = grid.indexOf("S")!;
const end = grid.indexOf("E")!;
grid.set(start, ".");
grid.set(end, ".");

const visited = new Map<string, number>();
const startPath = new CellSet();
startPath.add(start);
const queue: [Cell, Cell, CellSet, boolean, number][] = [[start, Cell.RIGHT, startPath, false, 0]]; // cell,dir,path,turned,points

let bestScore = null;
const bestPaths: CellSet[] = [];

while (queue.length > 0) {
    const [c, dir, path, turned, points] = queue.shift()!;
    if (bestScore && points > bestScore) break;
    const k = c.toString() + "," + dir.toString();
    const last = visited.get(k);
    if (last && last < points) continue;
    visited.set(k, points);
    if (c.equals(end)) {
        if (!bestScore) bestScore = points;
        bestPaths.push(path);
        continue;
    }
    if (grid.get(c.add(dir)) === ".") {
        const next = c.add(dir);
        const newPath = path.copy();
        newPath.add(next);
        queue.push([next, dir, newPath, false, points + 1]);
    }
    if (!turned) {
        for (const newDir of Cell.DIRECTIONS) {
            if (newDir.equals(dir) || newDir.equals(dir.negate())) continue;
            if (grid.get(c.add(newDir)) !== ".") continue;
            queue.push([c, newDir, path.copy(), true, points + 1000]);
        }
    }
    queue.sort((a, b) => a[4] - b[4]);
}

const bestPathCells = new CellSet();
for (const cs of bestPaths) {
    for (const c of cs) bestPathCells.add(c);
}

console.log(bestPathCells.size);
