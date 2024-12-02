const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(" ").map(Number));

let safe = 0;

for (const report of input) {
    const diff: number[] = [];
    for (let i = 1; i < report.length; i++) diff.push(report[i] - report[i - 1]);
    if (diff.every((d) => d > 0 && d <= 3) || diff.every((d) => d < 0 && d >= -3)) safe++;
}

console.log(safe);
