const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim());

let sum = 0;

for (let r = 0; r < input.length; r++) {
    sum += input[r].match(/XMAS/g)?.length ?? 0;
    sum += input[r].match(/SAMX/g)?.length ?? 0;
}

for (let c = 0; c < input[0].length; c++) {
    const column = input.map((r) => r[c]).join("");
    sum += column.match(/XMAS/g)?.length ?? 0;
    sum += column.match(/SAMX/g)?.length ?? 0;
}

for (let r = 0; r < input.length - 3; r++) {
    for (let c = 0; c < input.length - 3; c++) {
        const diag = input[r][c] + input[r + 1][c + 1] + input[r + 2][c + 2] + input[r + 3][c + 3];
        if (diag === "XMAS" || diag === "SAMX") sum++;
    }
}

for (let r = 0; r < input.length - 3; r++) {
    for (let c = 3; c < input.length; c++) {
        const diag = input[r][c] + input[r + 1][c - 1] + input[r + 2][c - 2] + input[r + 3][c - 3];
        if (diag === "XMAS" || diag === "SAMX") sum++;
    }
}

console.log(sum);
