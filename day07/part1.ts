const input = Deno.readTextFileSync("input").trim().split("\n").map((l) =>
    l.trim().split(": ").map((v, i) => !i ? Number(v) : v.split(" ").map(Number))
) as [number, number[]][];

let sum = 0;

for (const [total, numbers] of input) {
    const opCount = numbers.length - 1;
    for (let i = 0; i < 2 ** opCount; i++) {
        const ops = Array(opCount).fill(0).map((_, j) => Math.floor(i / (2 ** j)) % 2);
        let calc = numbers[0];
        for (let j = 0; j < opCount; j++) {
            if (ops[j] === 0) calc += numbers[j + 1];
            else if (ops[j] === 1) calc *= numbers[j + 1];
        }
        if (calc === total) {
            sum += total;
            break;
        }
    }
}

console.log(sum);
