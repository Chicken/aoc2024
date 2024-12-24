const input = Deno.readTextFileSync("input").trim().split("\n\n")[1].trim().split("\n").map((l) => l.trim());

console.log("digraph Circuit {");
console.log("  rankdir=LR;");

for (let i = 0; i < input.length; i++) {
    const [lhs, op, rhs, _, output] = input[i].split(" ");
    const gateLabel = `${op}${i}`;
    console.log(`  ${gateLabel} [label="${op}"]`);
    console.log(`  ${lhs} -> ${gateLabel};`);
    console.log(`  ${rhs} -> ${gateLabel};`);
    console.log(`  ${gateLabel} -> ${output};`);
}

console.log(`}`);
