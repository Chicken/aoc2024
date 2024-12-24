import { memoize } from "../lib/function.ts";

const input = Deno.readTextFileSync("input").trim().split("\n\n").map((h) =>
    h.trim().split("\n").map((l) => l.trim().split(" "))
);

const initial = Object.fromEntries(input[0].map((l) => [l[0].slice(0, -1), l[1] === "1"]));

// wire: op lhs rhs
const gates = Object.fromEntries(input[1].map((l) => [l[4], [l[1], l[0], l[2]]]));

const outputs = Object.keys(gates).filter((k) => k.startsWith("z")).sort();

const getValue = memoize((wire: string): boolean => {
    const [op, lhsStr, rhsStr] = gates[wire];
    const lhs = initial[lhsStr] ?? getValue(lhsStr);
    const rhs = initial[rhsStr] ?? getValue(rhsStr);
    switch (op) {
        case "AND":
            return lhs && rhs;
        case "OR":
            return lhs || rhs;
        case "XOR":
            return lhs !== rhs;
        default:
            throw new Error("unknown op");
    }
});

let ans = 0;

for (let i = 0; i < outputs.length; i++) {
    if (getValue(outputs[i])) ans += 2 ** i;
}

console.log(ans);
