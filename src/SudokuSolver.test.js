import SudokuSolver from "./SudokuSolver";

test("Test empty grid is solveable", () => {
  const grid = new Array(81).fill(0);
  const solver = new SudokuSolver(grid);
  expect(solver.isSolveable()).toBe(true);
});

test("Simple grid is solveable", () => {
  const grid = new Array(81).fill(0);
  grid[0] = 1;
  grid[1] = 2;
  grid[2] = 3;
  const solver = new SudokuSolver(grid);
  expect(solver.isSolveable()).toBe(true);
});

test("Duplicate box is not solveable", () => {
  const grid = new Array(81).fill(0);
  grid[27] = 1;
  grid[37] = 1;
  const solver = new SudokuSolver(grid);
  expect(solver.isSolveable()).toBe(false);
});

test("Duplicate row is not solveable", () => {
  const grid = new Array(81).fill(0);
  grid[27] = 1;
  grid[32] = 1;
  const solver = new SudokuSolver(grid);
  expect(solver.isSolveable()).toBe(false);
});

test("Duplicate column is not solveable", () => {
  const grid = new Array(81).fill(0);
  grid[32] = 1;
  grid[41] = 1;
  const solver = new SudokuSolver(grid);
  expect(solver.isSolveable()).toBe(false);
});

test("Shuffle does not change numbers", () => {
  const grid = new Array(81).fill(0);
  const solver = new SudokuSolver(grid);
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  solver.shuffle(numbers);
  for (let i = 0; i < 9; i++) {
    expect(numbers.includes(numbers[i])).toBe(true);
  }
});

test("GetRow returns row", () => {
  let grid = new Array(81).fill(0);
  grid[8] = 8;
  grid[11] = 9;
  const solver = new SudokuSolver(grid);
  const row0 = solver.getRow(0);
  const row1 = solver.getRow(1);

  expect(row0[8]).toBe(8);
  expect(row1[2]).toBe(9);

  expect(row0.includes(9)).toBe(false);
  expect(row1.includes(8)).toBe(false);
});

test("GetColumn returns column", () => {
  let grid = new Array(81).fill(0);
  grid[8] = 8;
  grid[11] = 9;
  const solver = new SudokuSolver(grid);
  const col8 = solver.getColumn(8);
  const col2 = solver.getColumn(2);

  expect(col8[0]).toBe(8);
  expect(col2[1]).toBe(9);

  expect(col8.includes(9)).toBe(false);
  expect(col2.includes(8)).toBe(false);
});

test("GetBox returns box", () => {
  let grid = new Array(81).fill(0);
  grid[8] = 8;
  grid[28] = 9;
  const solver = new SudokuSolver(grid);
  const box2 = solver.getBox(2);
  const box3 = solver.getBox(3);

  expect(box2[2]).toBe(8);
  expect(box3[1]).toBe(9);

  expect(box2.includes(9)).toBe(false);
  expect(box3.includes(8)).toBe(false);
});

test("IsValidToAdd respects rows", () => {
  let grid = new Array(81).fill(0);
  grid[0] = 1;
  const solver = new SudokuSolver(grid);
  expect(solver.isValidToAdd(1, 8)).toBe(false);
});

test("IsValidToAdd respects columns", () => {
  let grid = new Array(81).fill(0);
  grid[0] = 1;
  const solver = new SudokuSolver(grid);
  expect(solver.isValidToAdd(1, 27)).toBe(false);
});

test("IsValidToAdd respects boxes", () => {
  let grid = new Array(81).fill(0);
  grid[0] = 1;
  const solver = new SudokuSolver(grid);
  expect(solver.isValidToAdd(1, 11)).toBe(false);
});

test("IsValidGrid validates simple grid", () => {
  let grid = new Array(81).fill(0);
  grid[0] = 1;
  grid[1] = 2;
  grid[2] = 3;
  grid[3] = 4;
  const solver = new SudokuSolver(grid);
  expect(solver.isValidGrid()).toBe(true);
});

test("IsValidGrid identifies invalid grid", () => {
  let grid = new Array(81).fill(0);
  grid[0] = 1;
  grid[1] = 1;
  const solver = new SudokuSolver(grid);
  expect(solver.isValidGrid()).toBe(false);
});
