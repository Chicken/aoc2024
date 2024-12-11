import { memoize } from "../lib/function.ts";

const stones = Deno.readTextFileSync("input").trim().split(" ").map(Number);

const getLength = memoize((n: number, cycles: number): number => {
    if (cycles === 0) return 1;
    let len = 0;
    if (n === 0) len += getLength(1, cycles - 1);
    else if (n.toString().length % 2 === 0) {
        const str = n.toString();
        len += getLength(Number(str.slice(0, str.length / 2)), cycles - 1);
        len += getLength(Number(str.slice(str.length / 2)), cycles - 1);
    } else len += getLength(n * 2024, cycles - 1);
    return len;
});

let sum = 0;
for (let i = 0; i < stones.length; i++) sum += getLength(stones[i], 75);
console.log(sum);
