import { max, windows } from "../lib/array.ts";
import { mod } from "../lib/numbers.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim()).map(Number);

const sums = new Map<string, number>();

for (let s of input) {
    const ps = [s % 10];
    for (let j = 0; j < 2000; j++) {
        s = mod(s ^ (s * 64), 16777216);
        s = mod(s ^ Math.floor(s / 32), 16777216);
        s = mod(s ^ (s * 2048), 16777216);
        ps.push(s % 10);
    }
    const seen = new Set<string>();
    for (const window of windows(ps, 5)) {
        const diffs = [];
        for (let i = 1; i < window.length; i++) {
            diffs.push(window[i] - window[i - 1]);
        }
        const k = diffs.join(",");
        if (!seen.has(k)) {
            seen.add(k);
            sums.set(diffs.join(","), (sums.get(k) ?? 0) + window[4]);
        }
    }
}

console.log(max(sums.values()));
