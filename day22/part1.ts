import { mod } from "../lib/numbers.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim()).map(Number);

let sum = 0;

for (let s of input) {
    for (let i = 0; i < 2000; i++) {
        s = mod(s ^ (s * 64), 16777216);
        s = mod(s ^ Math.floor(s / 32), 16777216);
        s = mod(s ^ (s * 2048), 16777216);
    }
    sum += s;
}

console.log(sum);
