const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(""));

const k = (r: number, c: number) => `${r},${c}`;
const visited = new Set();

let pos = [
    input.findIndex((r) => r.includes("^")),
    input.find((r) => r.includes("^"))!.findIndex((c) => c === "^"),
];
let dir = [-1, 0];
input[pos[0]][pos[1]] = ".";

while (true) {
    const [r, c] = pos;
    const [dr, dc] = dir;
    visited.add(k(r, c));
    const [nr, nc] = [r + dr, c + dc];
    if (nr < 0 || nr >= input.length || nc < 0 || nc >= input[0].length) break;
    else if (input[nr][nc] === "#") dir = [dc, -dr];
    else pos = [nr, nc];
}

console.log(visited.size);
