import ora from 'ora';
import chalk from 'chalk';
import Player from './Player.ts';
import { select } from '@inquirer/prompts';

/** A spinner with a small delay */
export async function smallDelaySpinner(spinnerText = '', delay = 300) {
  const spinner = ora(spinnerText).start();
  await new Promise((resolve) => setTimeout(resolve, delay));
  spinner.stop();
}

/** A loud log function that underlines and bolds text */
export function loudLog(str: string) {
  console.log(chalk.underline.bold(` ${str} `));
}

/** Prompt the user if they want to play again */
export async function playAgainPrompt() {
  return select({
    message: "Do you want to play again?",
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
  });
}

/** Print the current score of both players */
export function printScore(player1: Player, player2: Player) {
  let winningPlayer: string = player1.getScore() > player2.getScore() ? player1.getName() : player2.getName();
  if (player1.getScore() === player2.getScore()) {
    winningPlayer = "";
  }

  const scoreText = (player: Player, winningPlayer: string) => {
    return `${chalk[player.getColor()](player.getName())}: ${player.getScore()} ${player.getName() === winningPlayer ? "👑" : ""}`;
  }

  console.log();
  console.log(chalk.bold(`Scoreboard:`));
  console.log(scoreText(player1, winningPlayer));
  console.log(scoreText(player2, winningPlayer));
  console.log();
}