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
    while (queue.notEmpty()) {
        const cell = queue.dequeue()!;
        if (grid.get(cell) !== val) continue;
        if (seen.has(cell)) continue;
        seen.add(cell);
        region.add(cell);
        for (const neighbour of cell.neighbours()) {
            if (grid.has(neighbour)) queue.enqueue(neighbour);
        }
    }

    let corners = 0;
    for (const cell of region) {
        for (
            const shape of [
                [Cell.UP, Cell.UP_RIGHT, Cell.RIGHT],
                [Cell.RIGHT, Cell.DOWN_RIGHT, Cell.DOWN],
                [Cell.DOWN, Cell.DOWN_LEFT, Cell.LEFT],
                [Cell.LEFT, Cell.UP_LEFT, Cell.UP],
            ]
        ) {
            if (
                (
                    !region.has(cell.add(shape[0])) &&
                    !region.has(cell.add(shape[2]))
                ) || (
                    region.has(cell.add(shape[0])) &&
                    !region.has(cell.add(shape[1])) &&
                    region.has(cell.add(shape[2]))
                )
            ) corners++;
        }
    }
    regions.push([region.size, corners]);
}

console.log(sum(regions.map(([s, p]) => s * p)));
