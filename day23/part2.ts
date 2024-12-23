import { combinations } from "../lib/array.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split("-"));

const nodes: Record<string, string[]> = {};

for (const [a, b] of input) {
    if (!nodes[a]) nodes[a] = [];
    if (!nodes[b]) nodes[b] = [];
    nodes[a].push(b);
    nodes[b].push(a);
}

const sets = new Set<string>();
const seen = new Set<string>();
for (const [node, edges] of Object.entries(nodes)) {
    if (seen.has(node)) continue;
    for (let i = edges.length - 1; i >= 2; i--) {
        let found = false;
        for (const group of combinations(edges, i)) {
            if (group.every((n1) => group.every((n2) => n1 === n2 || nodes[n1].includes(n2)))) {
                sets.add([node, ...group].sort().join(","));
                for (const n of [node, ...group]) seen.add(n);
                found = true;
                break;
            }
        }
        if (found) break;
    }
}

console.log(sets.values().toArray().sort((a, b) => b.split(",").length - a.split(",").length)[0]);
