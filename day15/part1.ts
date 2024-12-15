import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";

const input = Deno.readTextFileSync("input").trim().split("\n\n").map((p) => p.trim());

const grid = new Grid(input[0]);
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
                grid.set(robot.r, c, grid.get(robot.r, c + 1));
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
                grid.set(robot.r, c, grid.get(robot.r, c - 1));
            }
            robot = robot.add(Cell.RIGHT);
            break;
        }
        case "^": {
            const col = grid.getColumn(robot.c);
            if (col[robot.r - 1] === "#") break;
            const empty = col.findLastIndex((v, r) => r < robot.r && v === ".");
            if (empty === -1) break;
            if (col.slice(empty, robot.r).includes("#")) break;
            for (let r = empty; r < robot.r; r++) {
                grid.set(r, robot.c, grid.get(r + 1, robot.c));
            }
            robot = robot.add(Cell.UP);
            break;
        }
        case "v": {
            const col = grid.getColumn(robot.c);
            if (col[robot.r + 1] === "#") break;
            const empty = col.findIndex((v, r) => r > robot.r && v === ".");
            if (empty === -1) break;
            if (col.slice(robot.r, empty).includes("#")) break;
            for (let r = empty; r > robot.r; r--) {
                grid.set(r, robot.c, grid.get(r - 1, robot.c));
            }
            robot = robot.add(Cell.DOWN);
            break;
        }
    }
}

let sum = 0;
for (const [pos, val] of grid) {
    if (val == "O") sum += 100 * pos.r + pos.c;
}
console.log(sum);
