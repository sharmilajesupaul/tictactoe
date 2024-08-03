import chalk from 'chalk';
import { input } from '@inquirer/prompts';
import Player from './Player.ts';
import Board from './Board.ts';
import { loudLog, smallDelaySpinner } from './helpers.ts';

export class TicTacToe {
  private player1: Player;
  private player2: Player;
  private board: Board;

  constructor({ player1, player2 }: { player1: Player; player2: Player }) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Board();
  }

  async startGame() {
    // Randomly select the first player
    let currentPlayer = Math.random() < 0.5 ? this.player1 : this.player2;
    let winner = null;
    let count = 0;

    // Game loop
    while (!winner && count < 9) {
      count++;
      await this.playTurn(currentPlayer);

      if (this.board.checkWinner()) {
        winner = currentPlayer;
        break;
      }

      currentPlayer =
        currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    console.clear();
    await smallDelaySpinner('Calculating winner...');

    if (winner) {
      winner.incrementScore();
      console.log(chalk.green(`🎉 ${winner.getName()} wins! 🎉`));
    } else {
      console.log(chalk.yellow("It's a tie! 🤝"));
    }
  }

  private async playTurn(player: Player) {
    console.clear();
    await smallDelaySpinner(`Preparing board for ${player.getName()}`, 200);

    // Use a different color for each player in the terminal
    const terminalPlayerColor = chalk[player.getColor()];

    loudLog(terminalPlayerColor(`${player.getName()}'s turn!`));
    this.board.printBoard();

    const position = parseInt(
      await input({
        message: 'Choose a position on the board, from 1 to 9',
        validate: (input) => this.board.validatePosition(parseInt(input)),
      }),
    );

    this.board.updateBoard(position, terminalPlayerColor(player.getIcon()));

    console.clear();
    this.board.printBoard();
  }
}

export default TicTacToe;
