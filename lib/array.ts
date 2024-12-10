export function sum(arr: number[]) {
    return arr.reduce((acc, val) => acc + val, 0);
}

export function product(arr: number[]) {
    return arr.reduce((acc, val) => acc * val, 1);
}

export function max(arr: number[]) {
    return Math.max(...arr);
}

export function min(arr: number[]) {
    return Math.min(...arr);
}

export function freq<TEl>(arr: TEl[]) {
    return arr.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map<TEl, number>());
}

export function dedup(arr: number[]) {
    return [...new Set(arr)];
}

export const groupBy = Object.groupBy.bind(Object);

/**
 * 1, 2, 3, ...
 */
export function sortAsc<TEl = number>(arr: TEl[], extract: (el: TEl) => number = (el: TEl) => el as number) {
    return arr.sort((a, b) => extract(a) - extract(b));
}

/**
 * 3, 2, 1, ...
 */
export function sortDesc<TEl = number>(arr: TEl[], extract: (el: TEl) => number = (el: TEl) => el as number) {
    return arr.sort((a, b) => extract(b) - extract(a));
}
export function* pairs<TEl>(arr: TEl[]) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            yield [arr[i], arr[j]] as [TEl, TEl];
        }
    }
}

export function* windows<TEl>(length: number, arr: TEl[]) {
    for (let i = 0; i < arr.length - length + 1; i++) {
        yield arr.slice(i, i + length);
    }
}

export function* permutations<TEl>(arr: TEl[], length = arr.length): Generator<TEl[]> {
    if (length === 1) {
        yield* arr.map((el) => [el]);
        return;
    }
    for (const [i, el] of arr.entries()) {
        const rest = arr.slice(0, i).concat(arr.slice(i + 1));
        for (const perm of permutations(rest, length - 1)) {
            yield [el, ...perm];
        }
    }
}

export function* combinations<TEl>(arr: TEl[], length = arr.length): Generator<TEl[]> {
    if (length === 1) {
        yield* arr.map((el) => [el]);
        return;
    }
    if (length === arr.length) {
        yield arr;
        return;
    }
    for (const [i, el] of arr.entries()) {
        const rest = arr.slice(i + 1);
        for (const comb of combinations(rest, length - 1)) {
            yield [el, ...comb];
        }
    }
}
