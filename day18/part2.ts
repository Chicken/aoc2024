import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";
import { Queue } from "../lib/Queue.ts";
import { CellSet } from "../lib/Set.ts";
import { ints } from "../lib/string.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map(ints);

const size = 70;
const grid = new Grid<string>(size + 1, size + 1, ".");
const start = new Cell(0, 0);
const end = new Cell(size, size);

for (const byte of input) {
    grid.set(byte[1], byte[0], "#");

    const visited = new CellSet();
    const queue = new Queue<[Cell, number]>();
    queue.enqueue([start, 0]);

    let finished = false;
    while (queue.notEmpty()) {
        const [cell, length] = queue.dequeue()!;
        if (cell.equals(end)) {
            finished = true;
            break;
        }
        if (visited.has(cell)) continue;
        visited.add(cell);
        for (const neighbour of grid.neighbours(cell)) {
            if (grid.get(neighbour) === "#") continue;
            queue.enqueue([neighbour, length + 1]);
        }
    }
    if (!finished) {
        console.log(byte.join(","));
        break;
    }
}
