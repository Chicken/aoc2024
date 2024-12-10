import { Cell, type CellEquivalent } from "./Cell.ts";

// TODO: mutable methods
export class Grid<TValue> {
    public rows: TValue[][];

    constructor(initialGrid: TValue[][]) {
        this.rows = initialGrid;
    }

    get height() {
        return this.rows.length;
    }

    get width() {
        return this.rows[0]?.length ?? 0;
    }

    get(r: number, c: number): TValue;
    get(cell: CellEquivalent): TValue;
    get(arg1: number | CellEquivalent, arg2?: number): TValue {
        if (typeof arg1 === "number") return this.rows[arg1][arg2!];
        else {
            const cell = Cell.resolveEquivalent(arg1);
            return this.rows[cell.r][cell.c];
        }
    }

    set(r: number, c: number, value: TValue): void;
    set(cell: CellEquivalent, value: TValue): void;
    set(arg1: number | CellEquivalent, arg2: TValue | number, arg3?: TValue) {
        if (typeof arg1 === "number") this.rows[arg1][arg2 as number] = arg3!;
        else {
            const cell = Cell.resolveEquivalent(arg1);
            this.rows[cell.r][cell.c] = arg2 as TValue;
        }
    }

    toString(transform: (v: TValue) => string = (v) => String(v)) {
        return this.rows.map((row) => row.map(transform).join("")).join("\n");
    }

    has(r: number, c: number): boolean;
    has(cell: CellEquivalent): boolean;
    has(arg1: number | CellEquivalent, arg2?: number): boolean {
        if (typeof arg1 === "number") return arg1 >= 0 && arg1 < this.height && arg2! >= 0 && arg2! < this.width;
        else {
            const cell = Cell.resolveEquivalent(arg1);
            return cell.r >= 0 && cell.r < this.height && cell.c >= 0 && cell.c < this.width;
        }
    }

    *[Symbol.iterator]() {
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                yield [new Cell(r, c), this.rows[r][c]] as const;
            }
        }
    }

    neighbours(cell: Cell, includeDiagonals = false) {
        return cell.neighbours(includeDiagonals).filter((c) => this.has(c));
    }

    equals(other: Grid<TValue>) {
        if (this.height !== other.height || this.width !== other.width) return false;
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                if (this.rows[r][c] !== other.rows[r][c]) return false;
            }
        }
        return true;
    }

    map<TMappedValue>(mapFn: (cell: Cell, value: TValue, originalGrid: Grid<TValue>) => TMappedValue): Grid<TMappedValue> {
        return new Grid(this.rows.map((row, r) => row.map((v, c) => mapFn(new Cell(r, c), v, this))));
    }

    copy() {
        return new Grid(structuredClone(this.rows));
    }

    transpose() {
        const transposed = new Array(this.width).fill(null).map(() => new Array<TValue>(this.height));
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                transposed[c][r] = this.rows[r][c];
            }
        }
        return new Grid(transposed);
    }

    /**
     * You dumb frick.
     * Horizontally means in <---> this way.
     * So
     * ```
     * a b c
     * d e f
     * ```
     * becomes
     * ```
     * c b a
     * f e d
     * ```
     */
    flipHorizontally() {
        return new Grid(this.rows.map((row) => row.map((cell) => structuredClone(cell)).reverse()));
    }

    /**
     * You dumb frick.
     * Vertically means in ^v this way.
     * So
     * ```
     * a b c
     * d e f
     * ```
     * becomes
     * ```
     * d e f
     * a b c
     * ```
     */
    flipVertically() {
        return new Grid(this.rows.map((row) => structuredClone(row)).reverse());
    }

    rotateRight90() {
        return this.transpose().flipHorizontally();
    }

    rotateClockwise() {
        return this.rotateRight90();
    }

    rotateLeft90() {
        return this.transpose().flipVertically();
    }

    rotateCounterClockwise() {
        return this.rotateLeft90();
    }

    rotate180() {
        return this.flipHorizontally().flipVertically();
    }

    rotate(deg: number) {
        deg = (deg % 360 + 360) % 360;
        if (deg % 90 !== 0) throw new Error("Can only rotate by multiples of 90 degrees.");
        if (deg === 90) return this.rotateRight90();
        if (deg === 180) return this.rotate180();
        if (deg === 270) return this.rotateLeft90();
        return this.copy();
    }
}
