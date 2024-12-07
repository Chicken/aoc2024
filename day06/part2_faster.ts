const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(""));

const k = (r: number, c: number, dr: number, dc: number) => `${r},${c},${dr},${dc}`;

const startPos = [
    input.findIndex((r) => r.includes("^")),
    input.find((r) => r.includes("^"))!.findIndex((c) => c === "^"),
];
const startDir = [-1, 0];
input[startPos[0]][startPos[1]] = ".";

function traverse_track(grid: string[][]): [Set<string>, boolean] {
    const visited = new Set<string>();
    let pos = [...startPos];
    let dir = [...startDir];
    while (true) {
        const [r, c] = pos;
        const [dr, dc] = dir;
        const key = k(r, c, dr, dc);
        if (visited.has(key)) return [visited, true];
        visited.add(key);
        const [nr, nc] = [r + dr, c + dc];
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) return [visited, false];
        else if (grid[nr][nc] === "#") dir = [dc, -dr];
        else pos = [nr, nc];
    }
}

function isLoop(grid: string[][]): boolean {
    let pos = [...startPos];
    let dir = [...startDir];
    let steps = 0;
    while (true) {
        const [r, c] = pos;
        const [dr, dc] = dir;
        const [nr, nc] = [r + dr, c + dc];
        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) return false;
        else if (grid[nr][nc] === "#") dir = [dc, -dr];
        else pos = [nr, nc];
        // gosh darn hack
        if (++steps > grid.length * 4 * 16) return true;
    }
}

let sum = 0;

const [originalPathVisited] = traverse_track(input);
const originalPathNodes = [
    ...new Set(
        [...originalPathVisited].map((e) => e.split(",").slice(0, 2).join(",")),
    ),
].map((e) => e.split(",").map(Number));

for (const [r, c] of originalPathNodes) {
    if (input[r][c] === "#" || (r === startPos[0] && c == startPos[1])) continue;
    const grid = input.map((r) => [...r]);
    grid[r][c] = "#";
    if (isLoop(grid)) sum++;
}

console.log(sum);
