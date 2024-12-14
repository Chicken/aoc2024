import { Point2D } from "../lib/Point.ts";
import { ints } from "../lib/string.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim());
const dim = new Point2D(101, 103);
const robots: { pos: Point2D; vel: Point2D }[] = [];

for (const line of input) {
    const [x, y, vx, vy] = ints(line);
    robots.push({
        pos: new Point2D(x, y),
        vel: new Point2D(vx, vy),
    });
}

// function printRobots() {
//     const grid = new Array(dim.y).fill(0).map(() => new Array(dim.x).fill("."));
//     for (const robot of robots) {
//         grid[robot.pos.y][robot.pos.x] = "#";
//     }
//     console.log("---");
//     console.log(grid.map((row) => row.join("")).join("\n"));
//     console.log("---");
// }

// let maxConnected = 0;
let i = 0;
while (true) {
    i++;
    for (const robot of robots) {
        robot.pos = robot.pos.add(robot.vel).mod(dim);
    }

    let connected = 0;
    for (let j = 0; j < robots.length; j++) {
        for (let k = j + 1; k < robots.length; k++) {
            if (robots[j].pos.manhattanDistance(robots[k].pos) <= 1) connected++;
        }
    }

    // if (connected > maxConnected) {
    //     maxConnected = connected;
    //     console.log("NEW MAX CONNECTED:", maxConnected);
    //     console.log("SECONDS:", i);
    //     printRobots();
    // }
    if (connected > 400) {
        console.log(i);
        break;
    }
}
