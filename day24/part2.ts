const input = Deno.readTextFileSync("input_mod").trim().split("\n\n").map((h) =>
    h.trim().split("\n").map((l) => l.trim().split(" "))
);

const initial = Object.fromEntries(input[0].map((l) => [l[0].slice(0, -1), l[1] === "1"]));

// wire: op lhs rhs
const gates = Object.fromEntries(input[1].map((l) => [l[4], [l[1], l[0], l[2]]]));

function writeInitial(name: string, num: number): void {
    const bits = Object.keys(initial).filter((k) => k.startsWith(name)).sort();
    const numBits = num.toString(2).split("").reverse();
    for (let i = 0; i < bits.length; i++) {
        initial[bits[i]] = numBits[i] === "1";
    }
}

function readNumber(name: string): number {
    const isInitial = ["x", "y"].includes(name);
    const bits = Object.keys(isInitial ? initial : gates).filter((k) => k.startsWith(name)).sort();
    let num = 0;
    for (let i = 0; i < bits.length; i++) {
        if (isInitial ? initial[bits[i]] : getValue(bits[i])) num += 2 ** i;
    }
    return num;
}

const getValue = (wire: string): boolean => {
    const [op, lhsStr, rhsStr] = gates[wire];
    const lhs = initial[lhsStr] ?? getValue(lhsStr);
    const rhs = initial[rhsStr] ?? getValue(rhsStr);
    switch (op) {
        case "AND":
            return lhs && rhs;
        case "OR":
            return lhs || rhs;
        case "XOR":
            return lhs !== rhs;
        default:
            throw new Error("unknown op");
    }
};

console.log("x:", readNumber("x"));
console.log("y:", readNumber("y"));
console.log("x+y:", readNumber("x") + readNumber("y"));
console.log("z:  ", readNumber("z"));
console.log("x+y:", (readNumber("x") + readNumber("y")).toString(2));
console.log("z:  ", readNumber("z").toString(2));
console.log("gates:", Object.keys(gates).length);
console.log("output bits:", Object.keys(gates).filter((k) => k.startsWith("z")).length);

for (let i = 0; i < 45; i++) {
    writeInitial("x", 2 ** i);
    writeInitial("y", 2 ** i);
    if (2 ** i + 2 ** i !== readNumber("z")) {
        console.log("** IT:", String(i), "**");
        console.log("x:", readNumber("x"));
        console.log("y:", readNumber("y"));
        console.log("x+y:", 2 ** i + 2 ** i);
        console.log("z:  ", readNumber("z"));
        console.log("x+y:", (2 ** i + 2 ** i).toString(2));
        console.log("z:  ", readNumber("z").toString(2));
    }
}
