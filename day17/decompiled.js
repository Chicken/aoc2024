// deno-lint-ignore-file
let a = 64196994n;
let b = 0n;
let c = 0n;

while (a != 0n) {
    b = a % 8n;

    b = b ^ 1n;
    c = a >> b;
    b = b ^ 5n;
    b = b ^ c;

    a = a >> 3n;
    process.stdout.write((b % 8n).toString() + ",");
}
