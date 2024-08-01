import chalk from 'chalk';
import { select, input } from '@inquirer/prompts';
import Player from './Player.ts';
import Board from './Board.ts';

type GameMode = "player" | "computer" | "exit";

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
    console.log(chalk.green(`${player.getName()}'s turn`));
    this.board.printBoard();

    const position = await input({
      message: "Enter position",
      validate: (input) => {
        const position = parseInt(input);
        if (isNaN(position) || position < 0 || position > 8) {
          return "Invalid position. Please enter a number between 1 and 9";
        }

        if (!this.board.positionAvailable(position)) {
          return "Position already taken. Please enter a different position";
        }

        return true;
      },
    });

    player.addPosition(parseInt(position));
    this.board.updateBoard(parseInt(position), player.getIcon());

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

    while (!winner && count <= 9) {
      count++;
      await this.playTurn(currentPlayer);
      winner = this.board.checkWinner();

      if (winner) {
        break;
      }

      currentPlayer = currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    if (winner) {
      console.log(chalk.green(`🎉 ${currentPlayer.getName()} wins! 🎉`));
    } else {
      console.log(chalk.yellow("It's a tie!"));
    }
  }
}

async function main() {
  const mode: GameMode = await select({
    message: "Select game mode",
    choices: [
      { name: "Player vs. Player", value: "player" },
      { name: "Player vs. Computer", value: "computer" },
      { name: "Exit", value: "exit" },
    ],
  });

  if (mode === "exit") {
    console.log(chalk.red("Exiting..."));
    return
  }

  if (mode === "computer") {
    // not implemented yet
    console.log(chalk.red("Computer mode not implemented yet, exiting..."));
    return;
  }

  const player1Name = await input({
    message: "Enter player 1 name",
    default: "Player 1",
  });

  const player1 = new Player(player1Name, "🙅");

  const player2Name = await input({
    message: "Enter player 2 name",
    default: "Player 2",
  });

  const player2 = new Player(player2Name, "🍩");

  const game = new TicTacToe(player1, player2);
  await game.startGame();
}

main();