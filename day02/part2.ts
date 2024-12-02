const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(" ").map(Number));

let safe = 0;

for (const report of input) {
    const diffs: number[][] = [];
    for (let i = 0; i < report.length; i++) {
        diffs.push([]);
        const copy = report.filter((_, j) => j !== i);
        for (let j = 1; j < copy.length; j++) diffs[i].push(copy[j] - copy[j - 1]);
    }
    if (diffs.some((diff) => diff.every((d) => d > 0 && d <= 3) || diff.every((d) => d < 0 && d >= -3))) safe++;
}

console.log(safe);
