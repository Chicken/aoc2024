import { ints } from "../lib/string.ts";

const input = Deno.readTextFileSync("input").trim().split("\n");
let regA = ints(input[0])[0]!;
let regB = ints(input[1])[0]!;
let regC = ints(input[2])[0]!;
const program = ints(input[4]);

function getCombo(n: number) {
    switch (n) {
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return 2;
        case 3:
            return 3;
        case 4:
            return regA;
        case 5:
            return regB;
        case 6:
            return regC;
        case 7:
        default:
            throw new Error("Invalid combo operand");
    }
}

const out = [];
let i = 0;
while (i < program.length && i >= 0) {
    const op = program[i];
    const operand = program[i + 1];
    switch (op) {
        case 0:
            regA = regA >> getCombo(operand);
            break;
        case 1:
            regB = regB ^ operand;
            break;
        case 2:
            regB = getCombo(operand) % 8;
            break;
        case 3:
            if (regA !== 0) i = operand;
            else i += 2;
            break;
        case 4:
            regB = regB ^ regC;
            break;
        case 5:
            out.push(getCombo(operand) % 8);
            break;
        case 6:
            regB = regA >> getCombo(operand);
            break;
        case 7:
            regC = regA >> getCombo(operand);
            break;
    }
    if (op !== 3) i += 2;
}

console.log(out.join(","));
