const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(""));

const h = input.length;
const w = input[0].length;

const antennas: Record<string, [number, number][]> = {};
const antinodes = new Set<string>();
const k = (r: number, c: number) => `${r},${c}`;

for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
        if (input[r][c] != ".") {
            const type = input[r][c];
            if (!antennas[type]) antennas[type] = [];
            antennas[type].push([r, c]);
        }
    }
}

for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
        outer: for (const nodes of Object.values(antennas)) {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const [r1, c1] = nodes[i];
                    const [r2, c2] = nodes[j];
                    const dr = r2 - r1;
                    const dc = c2 - c1;

                    if ((r2 + dr == r && c2 + dc == c) || (r1 - dr == r && c1 - dc == c)) {
                        antinodes.add(k(r, c));
                        break outer;
                    }
                }
            }
        }
    }
}

console.log(antinodes.size);
