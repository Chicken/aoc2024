import { product } from "../lib/array.ts";
import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";
import { CellMap } from "../lib/Map.ts";
import { Point2D } from "../lib/Point.ts";
import { ints } from "../lib/string.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim());
const dim = new Point2D(101, 103);
const simLength = 100;
const robots: { pos: Point2D; vel: Point2D }[] = [];

for (const line of input) {
    const [x, y, vx, vy] = ints(line);
    robots.push({
        pos: new Point2D(x, y),
        vel: new Point2D(vx, vy),
    });
}

for (let s = 0; s < simLength; s++) {
    for (const robot of robots) {
        robot.pos = robot.pos.add(robot.vel).mod(dim);
    }
}

const quads = new CellMap<number>();
const grid = new Grid(dim.y, dim.x);

for (const robot of robots) {
    const quad = grid.getQuadrant(new Cell(robot.pos));
    if (!quad) continue;
    quads.set(quad, (quads.get(quad) || 0) + 1);
}

console.log(product(quads.values().toArray()));
