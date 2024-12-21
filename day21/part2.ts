import { min, sum, windows } from "../lib/array.ts";
import { Cell } from "../lib/Cell.ts";
import { memoize } from "../lib/function.ts";
import { Grid } from "../lib/Grid.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim());

const numPad = new Grid(`
789
456
123
.0A
`.trim());

const ctrlPad = new Grid(`
.^A
<v>
`.trim());

const getPaths = (pad: Grid<string>, sourceStr: string, targetStr: string): string[] => {
    if (sourceStr === targetStr) return ["A"];
    const source = pad.indexOf(sourceStr)!;
    const target = pad.indexOf(targetStr)!;
    const diff = target.sub(source);
    const r = Array(Math.abs(diff.r)).fill(diff.r > 0 ? "v" : "^").join("");
    const c = Array(Math.abs(diff.c)).fill(diff.c > 0 ? ">" : "<").join("");
    if (diff.r === 0 || diff.c === 0) return [r + c + "A"];
    const empty = pad.indexOf(".")!;
    const possible = [];
    if (!empty.equals(new Cell(target.r, source.c))) possible.push(r + c + "A");
    if (!empty.equals(new Cell(source.r, target.c))) possible.push(c + r + "A");
    return possible;
};

const minRobotLength = memoize((source: string, target: string, r: number): number => {
    const paths = getPaths(ctrlPad, source, target);
    if (r === 0) return 1;
    return min(paths.map((path) => {
        let total = 0;
        for (const [source, target] of windows(["A", ...path], 2)) {
            total += minRobotLength(source, target, r - 1);
        }
        return total;
    }));
});

const robots = 25;
let ans = 0;
for (const line of input) {
    let len = 0;
    for (const [source, target] of windows(["A", ...line], 2)) {
        len += min(
            getPaths(numPad, source, target).map((path) =>
                sum(windows(["A", ...path], 2).map(([s, t]) => minRobotLength(s, t, robots)))
            ),
        );
    }
    ans += len * parseInt(line, 10);
}

console.log(ans);
