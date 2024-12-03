const input = Deno.readTextFileSync("input").trim();

const insts = input.match(/mul\(\d+,\d+\)/g)!;

let sum = 0;

for (let i = 0; i < insts.length; i++) {
    const [lhs, rhs] = insts[i].match(/\d+/g)!;
    sum += parseInt(lhs) * parseInt(rhs);
}

console.log(sum);
