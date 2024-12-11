let stones = Deno.readTextFileSync("input").trim().split(" ").map(Number);

for (let i = 0; i < 25; i++) {
    const newStones: number[] = [];
    for (let j = 0; j < stones.length; j++) {
        if (stones[j] === 0) newStones.push(1);
        else if (stones[j].toString().length % 2 === 0) {
            const str = stones[j].toString();
            newStones.push(Number(str.slice(0, str.length / 2)));
            newStones.push(Number(str.slice(str.length / 2)));
        } else newStones.push(stones[j] * 2024);
    }
    stones = newStones;
}

console.log(stones.length);
