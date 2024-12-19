const input = Deno.readTextFileSync("input").trim().split("\n\n");

const towels = input[0].split(", ");
const designs = input[1].split("\n");

const possibleRegex = new RegExp(`^(${towels.join("|")})+$`);

let sum = 0;
for (const design of designs) {
    if (possibleRegex.test(design)) sum++;
}
console.log(sum);
