import ora from 'ora';
import chalk from 'chalk';
import Player from './Player.ts';
import { select } from '@inquirer/prompts';

// add a small delay to make the game more enjoyable
export async function smallDelaySpinner(spinnerText = '', delay = 300) {
  const spinner = ora(spinnerText).start();
  await new Promise((resolve) => setTimeout(resolve, delay));
  spinner.stop();
}

// a loud log function that highlights the text
export function loudLog(str: string) {
  console.log(chalk.underline.bold(` ${str} `));
}

export async function playAgainPrompt() {
  return select({
    message: "Do you want to play again?",
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
  });
}

export function printScore(player1: Player, player2: Player) {
  let winningPlayer: string = player1.getScore() > player2.getScore() ? player1.getName() : player2.getName();
  if (player1.getScore() === player2.getScore()) {
    winningPlayer = "";
  }

  console.log();
  console.log(chalk.bold(`Current score:`));
  console.log(`${chalk[player1.getColor()](player1.getName())}: ${player1.getScore()} ${player1.getName() === winningPlayer ? "👑" : ""}`);
  console.log(`${chalk[player2.getColor()](player2.getName())}: ${player2.getScore()} ${player2.getName() === winningPlayer ? "👑" : ""}`);
  console.log();
}