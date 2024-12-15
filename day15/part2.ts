import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";
import { Queue } from "../lib/Queue.ts";

const input = Deno.readTextFileSync("input").trim().split("\n\n").map((p) => p.trim());

const grid = new Grid(
    input[0].split("\n").map((l) =>
        l.split("").flatMap((c) => {
            if (c === "@") return ["@", "."];
            if (c === "O") return ["[", "]"];
            return [c, c];
        })
    ),
);
let robot = grid.indexOf("@")!;
grid.set(robot, ".");

const moves = input[1].replace(/\n/g, "").split("");

for (const move of moves) {
    switch (move) {
        case "<": {
            const row = grid.getRow(robot.r);
            if (row[robot.c - 1] === "#") break;
            const empty = row.findLastIndex((v, c) => c < robot.c && v === ".");
            if (empty === -1) break;
            if (row.slice(empty, robot.c).includes("#")) break;
            for (let c = empty; c < robot.c; c++) {
                row[c] = row[c + 1];
            }
            robot = robot.add(Cell.LEFT);
            break;
        }
        case ">": {
            const row = grid.getRow(robot.r);
            if (row[robot.c + 1] === "#") break;
            const empty = row.findIndex((v, c) => c > robot.c && v === ".");
            if (empty === -1) break;
            if (row.slice(robot.c, empty).includes("#")) break;
            for (let c = empty; c > robot.c; c--) {
                row[c] = row[c - 1];
            }
            robot = robot.add(Cell.RIGHT);
            break;
        }
        case "^": {
            const queue = new Queue<Cell>();
            queue.enqueue(robot.add(Cell.UP));
            const affectedCells = [];
            while (queue.notEmpty()) {
                const cell = queue.dequeue()!;
                affectedCells.push(cell);
                const cellVal = grid.get(cell);
                if (cellVal === "[") {
                    affectedCells.push(cell.add(Cell.RIGHT));
                    queue.enqueue(cell.add(Cell.UP));
                    queue.enqueue(cell.add(Cell.UP_RIGHT));
                }
                if (cellVal === "]") {
                    affectedCells.push(cell.add(Cell.LEFT));
                    queue.enqueue(cell.add(Cell.UP));
                    queue.enqueue(cell.add(Cell.UP_LEFT));
                }
            }
            const cellVals = affectedCells.map((cell) => grid.get(cell));
            if (cellVals.includes("#")) break;
            const newPos = affectedCells.map((cell) => cell.add(Cell.UP));
            for (const cell of affectedCells) grid.set(cell, ".");
            for (let i = 0; i < affectedCells.length; i++) {
                if (cellVals[i] !== ".") grid.set(newPos[i], cellVals[i]);
            }
            robot = robot.add(Cell.UP);
            break;
        }
        case "v": {
            const queue = new Queue<Cell>();
            queue.enqueue(robot.add(Cell.DOWN));
            const affectedCells = [];
            while (queue.notEmpty()) {
                const cell = queue.dequeue()!;
                affectedCells.push(cell);
                const cellVal = grid.get(cell);
                if (cellVal === "[") {
                    affectedCells.push(cell.add(Cell.RIGHT));
                    queue.enqueue(cell.add(Cell.DOWN));
                    queue.enqueue(cell.add(Cell.DOWN_RIGHT));
                }
                if (cellVal === "]") {
                    affectedCells.push(cell.add(Cell.LEFT));
                    queue.enqueue(cell.add(Cell.DOWN));
                    queue.enqueue(cell.add(Cell.DOWN_LEFT));
                }
            }
            const cellVals = affectedCells.map((cell) => grid.get(cell));
            if (cellVals.includes("#")) break;
            for (const cell of affectedCells) grid.set(cell, ".");
            const newPos = affectedCells.map((cell) => cell.add(Cell.DOWN));
            for (let i = 0; i < affectedCells.length; i++) {
                if (cellVals[i] !== ".") grid.set(newPos[i], cellVals[i]);
            }
            robot = robot.add(Cell.DOWN);
            break;
        }
    }
}

let sum = 0;
for (const [pos, val] of grid) {
    if (val == "[") sum += 100 * pos.r + pos.c;
}
console.log(sum);
