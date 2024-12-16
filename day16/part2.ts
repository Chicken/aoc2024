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
const queue: [Cell, Cell, CellSet, number][] = [[start, Cell.RIGHT, startPath, 0]]; // cell,dir,path,points

let bestScore = null;
const bestPaths: CellSet[] = [];

while (queue.length > 0) {
    const [c, dir, path, points] = queue.shift()!;
    const k = c.toString() + "," + dir.toString();
    const last = visited.get(k);
    if (last && last < points) continue;
    visited.set(k, points);
    if (c.equals(end)) {
        if (!bestScore) bestScore = points;
        if (points > bestScore) break;
        bestPaths.push(path);
        continue;
    }
    if (grid.get(c.add(dir)) === ".") {
        const next = c.add(dir);
        const newPath = path.copy();
        newPath.add(next);
        queue.push([next, dir, newPath, points + 1]);
    }
    for (const newDir of Cell.DIRECTIONS) {
        if (newDir.equals(dir) || newDir.equals(dir.negate())) continue;
        if (grid.get(c.add(newDir)) !== ".") continue;
        queue.push([c, newDir, path.copy(), points + 1000]);
    }
    queue.sort((a, b) => a[3] - b[3]);
}

const bestPathCells = new CellSet();
for (const cs of bestPaths) {
    for (const c of cs) bestPathCells.add(c);
}

console.log(bestPathCells.size);
