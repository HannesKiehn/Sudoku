class SudokuSolver {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getRow(index) {
    return this.numbers.slice(index * 9, (index + 1) * 9);
  }

  getColumn(index) {
    let columnNumbers = [];
    for (let row = 0; row < 9; row++) {
      columnNumbers.push(this.numbers[index + row * 9]);
    }
    return columnNumbers;
  }

  getBox(bigBoxIndex) {
    let bigBoxRow = Math.floor(bigBoxIndex / 3);
    bigBoxIndex = bigBoxIndex % 3;
    let content = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let index = bigBoxRow * 27 + row * 9 + bigBoxIndex * 3 + col;
        content.push(this.numbers[index]);
      }
    }
    return content;
  }

  isSolveable() {
    if (!this.isValidGrid()) {
      return false;
    }
    return this.solver();
  }

  solver() {
    let zeroIndex = this.numbers.indexOf(0);
    if (zeroIndex === -1) {
      return true;
    }
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.shuffle(numbers);
    for (let i = 0; i < 9; i++) {
      if (this.isValidToAdd(numbers[i], zeroIndex)) {
        this.numbers[zeroIndex] = numbers[i];
        if (this.isSolveable()) {
          return true;
        }
        this.numbers[zeroIndex] = 0;
      }
    }
    return false;
  }
  // Fisher-Yates shuffle algorithm
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getSolution() {
    if (!this.isSolveable()) {
      new Error("No solution");
    } else {
      return this.numbers;
    }
  }

  isValidToAdd(number, index) {
    let rowNum = Math.floor(index / 9);
    let colNum = index % 9;
    let boxNum = Math.floor(rowNum / 3) * 3 + Math.floor(colNum / 3);

    if (this.getRow(rowNum).includes(number)) {
      return false;
    }
    if (this.getColumn(colNum).includes(number)) {
      return false;
    }
    if (this.getBox(boxNum).includes(number)) {
      this.numbers[index] = 0;
      return false;
    }
    return true;
  }

  isValidGrid() {
    for (let i = 0; i < 81; i++) {
      if (this.numbers[i] !== 0) {
        let saveNum = this.numbers[i];
        this.numbers[i] = 0;
        if (!this.isValidToAdd(saveNum, i)) {
          this.numbers[i] = saveNum;
          return false;
        }
        this.numbers[i] = saveNum;
      }
    }
    return true;
  }
}

export default SudokuSolver;
