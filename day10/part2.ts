import type { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";
import { Queue } from "../lib/Queue.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split("").map(Number));

const grid = new Grid(input);

let sum = 0;

for (const [cell, value] of grid) {
    if (value != 0) continue;
    let heads = 0;
    const q = new Queue<Cell>();
    q.enqueue(cell);
    while (q.notEmpty()) {
        const current = q.dequeue()!;
        if (grid.get(current) == 9) {
            heads++;
            continue;
        }
        for (const neighbour of grid.neighbours(current)) {
            if (grid.get(neighbour) === grid.get(current)! + 1) {
                q.enqueue(neighbour);
            }
        }
    }
    sum += heads;
}

console.log(sum);
