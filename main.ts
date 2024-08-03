import chalk from 'chalk';
import { select, input } from '@inquirer/prompts';
import { loudLog, playAgainPrompt, printScore } from './helpers.ts';
import Player from './Player.ts';
import TicTacToe from './TicTacToe.ts';

type GameMode = "player" | "computer" | "exit";

async function playerVsPlayer(player1: Player | null = null, player2: Player | null = null) {
  console.clear();
  loudLog(chalk.bgBlack.white("Player vs. Player mode"));

  let player1Name = "Player 1";
  if (!player1) {
    player1Name = await input({
      message: "Enter player 1 name",
      default: player1Name,
    });
  }

  player1 = player1 ?? new Player({
    name: player1Name,
    icon: "X",
    color: "magentaBright",
  });

  let player2Name = "Player 2";
  if (!player2) {
    player2Name = await input({
      message: "Enter player 2 name",
      default: player2Name,
      validate: (input) => {
        if (input === player1Name) {
          return "Please enter a different name, this name is already taken";
        }
        return true;
      }
    });
  }

  player2 = player2 ?? new Player({
    name: player2Name,
    icon: "O",
    color: "cyanBright",
  });

  const game = new TicTacToe({ player1, player2 });
  await game.startGame();

  printScore(player1, player2);

  // TODO: Add a reset score option?
  // TODO: Add a change mode option?
  const playAgain = await playAgainPrompt();

  if (playAgain) {
    return playerVsPlayer(player1, player2);
  } else {
    console.log(chalk.red("Exiting..."));
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
    console.log(chalk.red("Computer mode not implemented yet, exiting..."));
    return;
  }

  if (mode === "player") {
    return playerVsPlayer();
  }
}

main();