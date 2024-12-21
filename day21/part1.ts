import { Cell } from "../lib/Cell.ts";
import { Grid } from "../lib/Grid.ts";

const input = Deno.readTextFileSync("input").trim().split("\n").map((l) => l.trim().split(""));

let sum = 0;

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

function createSequence(current: string[], seqPos: string[][][]): string[][] {
    if (seqPos.length === 0) return [current];
    const poss = seqPos[0];
    const seqs = [];
    for (const pos of poss) {
        seqs.push(...createSequence([...current, ...pos], seqPos.slice(1)));
    }
    return seqs;
}

function getSequences(pad: Grid<string>, start: Cell, targetSeq: string[]): string[][] {
    const seqPos = [];
    let pos = start;
    for (const char of targetSeq) {
        const targetPos = pad.indexOf(char)!;
        const diff = targetPos.sub(pos);
        const moves: string[] = [
            ...Array(Math.abs(diff.c)).fill(diff.c > 0 ? ">" : "<"),
            ...Array(Math.abs(diff.r)).fill(diff.r > 0 ? "v" : "^"),
        ];

        let permutations = [];
        if (diff.r !== 0 && diff.c !== 0) {
            for (const perm of [moves, [...moves].reverse()]) {
                let movingPos = pos.copy();
                let bad = false;
                for (const move of perm) {
                    movingPos = movingPos.add({ "<": Cell.LEFT, ">": Cell.RIGHT, "^": Cell.UP, "v": Cell.DOWN }[move]!);
                    if (pad.get(movingPos) === ".") bad = true;
                }
                if (!bad) permutations.push(perm);
            }
        } else {
            permutations = [moves];
        }
        if (permutations.length) seqPos.push(permutations);
        seqPos.push([["A"]]);
        pos = targetPos;
    }
    return createSequence([], seqPos);
}

for (let i = 0; i < input.length; i++) {
    let sequences = getSequences(numPad, numPad.indexOf("A")!, input[i]);

    for (let j = 0; j < 2; j++) {
        const newSequences = [];
        for (const seq of sequences) {
            newSequences.push(...getSequences(ctrlPad, ctrlPad.indexOf("A")!, seq));
        }
        sequences = newSequences;
    }
    let shortest = sequences[0];
    for (const seq of sequences) {
        if (seq.length < shortest.length) shortest = seq;
    }
    sum += shortest.length * parseInt(input[i].join(""));
}

console.log(sum);
