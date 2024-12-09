const input = Deno.readTextFileSync("input").trim().split("").map(Number);

const arr: [number | null, number][] = [];

for (let i = 0; i < input.length; i++) {
    const n = input[i];
    if (i % 2 == 0) arr.push([i / 2, n]);
    else arr.push([null, n]);
}

for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i][0] === null) continue;
    for (let j = 0; j < i; j++) {
        if (arr[j][0] !== null) continue;
        if (arr[j][1] >= arr[i][1]) {
            const el = arr[i];
            arr.splice(i, 1, [null, el[1]]);
            arr[j][1] -= el[1];
            arr.splice(j, 0, el);
            break;
        }
    }
}

let sum = 0;
let idx = 0;
for (let i = 0; i < arr.length; i++) {
    const [id, length] = arr[i];
    if (id === null) {
        idx += length;
        continue;
    }
    for (let j = 0; j < length; j++) {
        sum += (idx + j) * id;
    }
    idx += length;
}

console.log(sum);
