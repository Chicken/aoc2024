const rawInput = Deno.readTextFileSync("input").trim().split("\n\n").map((p) =>
    p.trim().split("\n").map((l) => l.trim())
);

const order = rawInput[0].map((l) => l.split("|"));
const input = rawInput[1].map((l) => l.split(","));
const incorrect = [];

outer: for (let i = 0; i < input.length; i++) {
    const seen = new Set();
    const pages = input[i];

    for (const page of pages) {
        const deps = order.filter((o) => o[1] === page).map((o) => o[0]).filter((d) => pages.includes(d));
        if (deps.some((d) => !seen.has(d))) {
            incorrect.push(pages);
            continue outer;
        }
        seen.add(page);
    }
}

let sum = 0;

for (let i = 0; i < incorrect.length; i++) {
    const pages = incorrect[i]

    pages.sort((a, b) => {
        const depsA = order.filter((o) => o[1] === a).map((o) => o[0]).filter((d) => pages.includes(d));
        const depsB = order.filter((o) => o[1] === b).map((o) => o[0]).filter((d) => pages.includes(d));
        if (depsA.includes(b)) return 1;
        if (depsB.includes(a)) return -1;
        return 0;
    });
    sum += parseInt(pages[Math.floor(pages.length / 2)]);
}

console.log(sum);
