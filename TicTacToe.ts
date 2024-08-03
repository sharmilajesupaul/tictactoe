import chalk from "chalk";
import { input, select } from "@inquirer/prompts";
import Player from "./Player.ts";
import Board from "./Board.ts";
import { loudLog, smallDelaySpinner } from "./helpers.ts";

export class TicTacToe {
  private player1: Player;
  private player2: Player;
  private board: Board;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Board();
  }

  async playTurn(player: Player) {
    console.clear();
    await smallDelaySpinner(`Preparing board for ${player.getName()}`);

    // Use a different color for each player in the terminal
    const terminalPlayerColor = chalk[player.getColor()];

    loudLog(terminalPlayerColor(`${player.getName()}'s turn!`));
    this.board.printBoard();

    const position = parseInt(await input({
      message: "Choose a position on the board, from 1 to 9",
      validate: (input) => this.board.validatePosition(parseInt(input)),
    }));

    player.addPosition(position);
    this.board.updateBoard(position, terminalPlayerColor(player.getIcon()));

    console.clear();
    this.board.printBoard();
  }

  async startGame() {
    console.log(chalk.blue("Game started!"));
    console.log();
    console.log(chalk.green(`${this.player1.getName()} is ${this.player1.getIcon()}`));
    console.log(chalk.green(`${this.player2.getName()} is ${this.player2.getIcon()}`));
    console.log();

    let currentPlayer = this.player1;
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

      currentPlayer = currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    console.clear();
    await smallDelaySpinner("Calculating winner...");

    if (winner) {
      winner.incrementScore();
      console.log(chalk.green(`🎉 ${winner.getName()} wins! 🎉`));
    } else {
      console.log(chalk.yellow("It's a tie! 🤝"));
    }
  }
}

export default TicTacToe;