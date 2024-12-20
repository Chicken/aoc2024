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

const path = [start];
const dists = new CellMap<number>();
dists.set(start, 0);
const queue = new Queue<Cell>();
queue.enqueue(start);
while (queue.notEmpty()) {
    const cell = queue.dequeue()!;
    for (const next of grid.neighbours(cell)) {
        if (grid.get(next) === "." && !dists.has(next)) {
            queue.enqueue(next);
            path.push(next);
            dists.set(next, dists.get(cell)! + 1);
        }
    }
}

let sum = 0;
for (let i = 0; i < path.length; i++) {
    for (let j = i; j < path.length; j++) {
        const start = path[i];
        const end = path[j];
        const dist = start.manhattanDistance(end);
        if (dist <= 20) {
            const saved = dists.get(end)! - dists.get(start)! - dist;
            if (saved >= 100) sum++;
        }
    }
}

console.log(sum);
