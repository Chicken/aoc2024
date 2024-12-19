import { memoize } from "../lib/function.ts";

const input = Deno.readTextFileSync("input").trim().split("\n\n");

const towels = input[0].split(", ");
const designs = input[1].split("\n");

const recurse = memoize((toMatch: string): number => {
    if (toMatch === "") return 1;
    let sum = 0;
    for (const towel of towels) {
        if (toMatch.startsWith(towel)) {
            sum += recurse(toMatch.slice(towel.length));
        }
    }
    return sum;
});

let sum = 0;

for (const design of designs) {
    sum += recurse(design);
}

console.log(sum);
