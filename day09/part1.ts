const input = Deno.readTextFileSync("input").trim().split("").map(Number);

const arr: (number | null)[] = [];

for (let i = 0; i < input.length; i++) {
    const n = input[i];
    for (let j = 0; j < n; j++) {
        if (i % 2 == 0) arr.push(i / 2);
        else arr.push(null);
    }
}

let idx = 0;
while (arr.lastIndexOf(null) !== -1) {
    const el = arr.pop()!;
    while (arr.at(-1) === null) arr.pop();
    while (arr[idx] !== null && idx < arr.length) idx++;
    arr[idx] = el;
}

console.log(arr.map((v, i) => v! * i).reduce((a, c) => a + c));
