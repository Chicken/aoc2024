import { pairs } from "../lib/array.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split("-"));

const nodes: Record<string, string[]> = {};

for (const [a, b] of input) {
    if (!nodes[a]) nodes[a] = [];
    if (!nodes[b]) nodes[b] = [];
    nodes[a].push(b);
    nodes[b].push(a);
}

const sets = new Set<string>();
for (const [node, edges] of Object.entries(nodes)) {
    for (const [a, b] of pairs(edges)) {
        if (nodes[a].includes(b)) {
            sets.add([node, a, b].sort().join(","));
        }
    }
}

console.log(sets.values().filter((s) => s.split(",").some((n) => n.startsWith("t"))).toArray().length);
