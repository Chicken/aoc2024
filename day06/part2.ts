const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(""));

const k = (r: number, c: number, dr: number, dc: number) => `${r},${c},${dr},${dc}`;

const startPos = [
    input.findIndex((r) => r.includes("^")),
    input.find((r) => r.includes("^"))!.findIndex((c) => c === "^"),
];
const startDir = [-1, 0];
input[startPos[0]][startPos[1]] = ".";

function isLoop(grid: string[][]): boolean {
    const visited = new Set();
    let pos = [...startPos];
    let dir = [...startDir];
    while (true) {
        const [r, c] = pos;
        const [dr, dc] = dir;
        const key = k(r, c, dr, dc);
        if (visited.has(key)) return true;
        visited.add(key);
        const [nr, nc] = [r + dr, c + dc];
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) return false;
        else if (grid[nr][nc] === "#") dir = [dc, -dr];
        else pos = [nr, nc];
    }
}

let sum = 0;

for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[0].length; c++) {
        if (input[r][c] === "#" || (r === startPos[0] && c == startPos[1])) continue;
        const grid = input.map((r) => [...r]);
        grid[r][c] = "#";
        if (isLoop(grid)) sum++;
    }
}

console.log(sum);
