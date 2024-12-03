const input = Deno.readTextFileSync("input").trim();

const insts = input.match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g)!;

let sum = 0;
let enabled = true;

for (let i = 0; i < insts.length; i++) {
    if (insts[i] === "do()") {
        enabled = true;
        continue;
    }
    if (insts[i] === "don't()") {
        enabled = false;
        continue;
    }
    if (!enabled) continue;
    const [lhs, rhs] = insts[i].match(/\d+/g)!;
    sum += parseInt(lhs) * parseInt(rhs);
}

console.log(sum);
