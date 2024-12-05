const rawInput = Deno.readTextFileSync("input").trim().split("\n\n").map((p) =>
    p.trim().split("\n").map((l) => l.trim())
);

const order = rawInput[0].map((l) => l.split("|"));
const input = rawInput[1].map((l) => l.split(","));

let sum = 0;

outer: for (let i = 0; i < input.length; i++) {
    const seen = new Set();
    const pages = input[i];

    for (const page of pages) {
        const deps = order.filter((o) => o[1] === page).map((o) => o[0]).filter((d) => pages.includes(d));
        if (deps.some((d) => !seen.has(d))) continue outer;
        seen.add(page);
    }

    sum += parseInt(pages[Math.floor(pages.length / 2)]);
}

console.log(sum);
