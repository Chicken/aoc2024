import { ints } from "../lib/string.ts";

const input = Deno.readTextFileSync("input").trim().split("\n");
const program = ints(input[4]);

function recurse(out: number[], i: number = 0, a: bigint = 0n): bigint[] {
    if (i >= out.length) return [a];
    const pos: bigint[][] = [];
    let b, c;
    a = a << 3n;
    for (let j = 0n; j <= 7n; j++) {
        a = a + j;
        b = a % 8n;
        b = b ^ 1n;
        c = a >> b;
        b = b ^ 5n;
        b = b ^ c;
        if (Number(b % 8n) === out[i]) pos.push(recurse(out, i + 1, a));
        a = a - j;
    }
    return pos.flat();
}

console.log(Number(recurse(program.toReversed()).sort((a, b) => Number(a - b))[0]));
