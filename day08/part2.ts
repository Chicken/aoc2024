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
                    const dr1 = r - r1;
                    const dc1 = c - c1;
                    const dr2 = r - r2;
                    const dc2 = c - c2;

                    if (
                        (
                            dr1 / dc1 !== dr2 / dc2
                        ) && !(
                            (dr1 == 0 && dc1 == 0) || (dr2 == 0 && dc2 == 0)
                        )
                    ) continue;

                    antinodes.add(k(r, c));
                    break outer;
                }
            }
        }
    }
}

console.log(antinodes.size);
