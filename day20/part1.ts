import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";
import { CellMap } from "../lib/Map.ts";
import { Queue } from "../lib/Queue.ts";

const input = Deno.readTextFileSync("input").trim();

const grid = new Grid(input);
const start = grid.indexOf("S")!;
const end = grid.indexOf("E")!;
grid.set(start, ".");
grid.set(end, ".");

const dists = new CellMap<number>();
dists.set(start, 0);
const queue = new Queue<Cell>();
queue.enqueue(start);
while (queue.notEmpty()) {
    const cell = queue.dequeue()!;
    for (const next of grid.neighbours(cell)) {
        if (grid.get(next) === "." && !dists.has(next)) {
            queue.enqueue(next);
            dists.set(next, dists.get(cell)! + 1);
        }
    }
}

let sum = 0;
for (const [cell, value] of grid) {
    if (value !== "#") continue;
    if (grid.get(cell.add(Cell.LEFT)) === "." && grid.get(cell.add(Cell.RIGHT)) === ".") {
        const left = dists.get(cell.add(Cell.LEFT))!;
        const right = dists.get(cell.add(Cell.RIGHT))!;
        const saved = Math.max(left, right) - Math.min(left, right) - 2;
        if (saved >= 100) sum++;
    }
    if (grid.get(cell.add(Cell.UP)) === "." && grid.get(cell.add(Cell.DOWN)) === ".") {
        const up = dists.get(cell.add(Cell.UP))!;
        const down = dists.get(cell.add(Cell.DOWN))!;
        const saved = Math.max(up, down) - Math.min(up, down) - 2;
        if (saved >= 100) sum++;
    }
}

console.log(sum);
