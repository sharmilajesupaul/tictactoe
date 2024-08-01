class Board {
  private board = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
  ];

  printBoard() {
    console.log(this.board.map((row) => row.join(" | ")).join("\n---------\n"));
  }

  updateBoard(position: number, icon: string) {
    for (const row of this.board) {
      for (let cell = 0; cell < row.length; cell++) {
        if (parseInt(row[cell]) === position) {
          row[cell] = icon;
          return;
        }
      }
    }
  }

  checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.board[Math.floor(a / 3)][a % 3] === this.board[Math.floor(b / 3)][b % 3] &&
        this.board[Math.floor(b / 3)][b % 3] === this.board[Math.floor(c / 3)][c % 3]
      ) {
        return this.board[Math.floor(a / 3)][a % 3];
      }
    }

    return null;
  }

  positionAvailable(position: number) {
    for (const row of this.board) {
      for (const cell of row) {
        if (parseInt(cell) === position) {
          return true;
        }
      }
    }

    return false;
  }
}

export default Board;