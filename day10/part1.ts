import type { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";
import { Queue } from "../lib/Queue.ts";
import { CellSet } from "../lib/Set.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split("").map(Number));

const grid = new Grid(input);

let sum = 0;

for (const [cell, value] of grid) {
    if (value != 0) continue;
    const heads = new CellSet();
    const q = new Queue<Cell>();
    q.enqueue(cell);
    while (q.notEmpty()) {
        const current = q.dequeue()!;
        if (grid.get(current) == 9) {
            heads.add(current);
            continue;
        }
        for (const neighbour of grid.neighbours(current)) {
            if (grid.get(neighbour) === grid.get(current)! + 1) {
                q.enqueue(neighbour);
            }
        }
    }
    sum += heads.size;
}

console.log(sum);
