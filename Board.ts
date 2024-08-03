class Board {
  // We default to a board of numbers, so the user can choose a position by its number.
  // Using 1 index instead of 0 index so the 0 isn't confused with the letter O.
  private board: (number | string)[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  printBoard() {
    console.log();
    console.log(this.board.map((row) => row.join(" | ")).join("\n---------\n"));
    console.log();
  }

  updateBoard(position: number, icon: string) {
    for (const row of this.board) {
      for (let cell = 0; cell < row.length; cell++) {
        if (row[cell] === position) {
          row[cell] = icon;
          return;
        }
      }
    }
  }

  checkWinner() {
    const winningCombinations: number[][] = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
      [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
      [1, 5, 9], [3, 5, 7], // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      const { row: aRow, col: aCol } = this.getRowAndColumn(a);
      const { row: bRow, col: bCol } = this.getRowAndColumn(b);
      const { row: cRow, col: cCol } = this.getRowAndColumn(c);

      if (
        this.board[aRow][aCol] === this.board[bRow][bCol] &&
        this.board[bRow][bCol] === this.board[cRow][cCol]
      ) {
        return true;
      }
    }

    return false;
  }

  positionAvailable(position: number) {
    for (const row of this.board) {
      for (const cell of row) {
        if (cell === position) {
          return true;
        }
      }
    }

    return false
  }

  validatePosition(position: number) {
    if (isNaN(position) || !this.isValidPosition(position)) {
      return "Invalid position. Please enter a number between 1 and 9"
    }

    if (!this.positionAvailable(position)) {
      return "Position already taken. Please enter a different position";
    }

    return true;
  }


  private isValidPosition(position: number) {
    return position >= 1 && position <= 9;
  }

  private getRowAndColumn(position: number) {
    const row = Math.floor((position - 1) / 3);
    const col = (position - 1) % 3;
    return { row, col };
  };
}

export default Board;
