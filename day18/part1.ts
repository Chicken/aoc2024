import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";
import { Queue } from "../lib/Queue.ts";
import { CellSet } from "../lib/Set.ts";
import { ints } from "../lib/string.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map(ints);

const size = 70;
const bytes = 1024;
const grid = new Grid<string>(size + 1, size + 1, ".");
const start = new Cell(0, 0);
const end = new Cell(size, size);

for (let i = 0; i < bytes; i++) {
    const [x, y] = input[i];
    grid.set(y, x, "#");
}

const visited = new CellSet();
const queue = new Queue<[Cell, number]>();
queue.enqueue([start, 0]);

while (queue.notEmpty()) {
    const [cell, length] = queue.dequeue()!;
    if (cell.equals(end)) {
        console.log(length);
        break;
    }
    if (visited.has(cell)) continue;
    visited.add(cell);
    for (const neighbour of grid.neighbours(cell)) {
        if (grid.get(neighbour) === "#") continue;
        queue.enqueue([neighbour, length + 1]);
    }
}
