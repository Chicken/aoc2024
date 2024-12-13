import { Point2D } from "../lib/Point.ts";

const rawInput = Deno.readTextFileSync("input").trim().split("\n\n").map((l) => l.split("\n"));
const machines = [];
const priceA = 3;
const priceB = 1;

for (const [A, B, P] of rawInput) {
    const [ax, ay] = A.match(/\d+/g)!.map(Number);
    const [bx, by] = B.match(/\d+/g)!.map(Number);
    const [px, py] = P.match(/\d+/g)!.map(Number);
    machines.push({
        a: new Point2D(ax, ay),
        b: new Point2D(bx, by),
        p: new Point2D(px, py),
    });
}

let sum = 0;

for (const { a, b, p } of machines) {
    // px = ax * A + bx * B
    // py = ay * A + by * B
    const A = (-b.x * p.y + b.y * p.x) / (a.x * b.y - a.y * b.x);
    const B = (a.x * p.y - a.y * p.x) / (a.x * b.y - a.y * b.x);
    if (A === Math.floor(A) && B === Math.floor(B) && A >= 0 && B >= 0) {
        sum += A * priceA + B * priceB;
    }
}

console.log(sum);
