const input = Deno.readTextFileSync("input").trim().split("\n").map((l) =>
    l.trim().split(" ").map(Number).filter(Boolean)
);

const left = input.map((l) => l[0]).sort((a, b) => a - b);
const right = input.map((l) => l[1]).sort((a, b) => a - b);

let sum = 0;

for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
}

console.log(sum);
