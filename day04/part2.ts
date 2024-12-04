const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim());

let sum = 0;

for (let r = 1; r < input.length - 1; r++) {
    for (let c = 0; c < input.length - 2; c++) {
        const diag1 = input[r - 1][c] + input[r][c + 1] + input[r + 1][c + 2];
        const diag2 = input[r + 1][c] + input[r][c + 1] + input[r - 1][c + 2];
        if ((diag1 === "MAS" || diag1 === "SAM") && (diag2 === "MAS" || diag2 == "SAM")) sum++;
    }
}

console.log(sum);

