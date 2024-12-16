import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";

const input = Deno.readTextFileSync("input").trim();
const grid = new Grid(input);
const start = grid.indexOf("S")!;
const end = grid.indexOf("E")!;
grid.set(start, ".");
grid.set(end, ".");

const visited = new Set<string>();
const queue: [Cell, Cell, number][] = [[start, Cell.RIGHT, 0]]; // cell,dir,points

while (queue.length > 0) {
    const [c, dir, points] = queue.shift()!;
    const k = c.toString() + "," + dir.toString();
    if (visited.has(k)) continue;
    visited.add(k);
    if (c.equals(end)) {
        console.log(points);
        break;
    }
    if (grid.get(c.add(dir)) === ".") {
        const next = c.add(dir);
        queue.push([next, dir, points + 1]);
    }
    for (const newDir of Cell.DIRECTIONS) {
        if (newDir.equals(dir) || newDir.equals(dir.negate())) continue;
        queue.push([c, newDir, points + 1000]);
    }
    queue.sort((a, b) => a[2] - b[2]);
}
