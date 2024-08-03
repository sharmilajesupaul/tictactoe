import chalk from 'chalk';
import { select, input } from '@inquirer/prompts';
import { loudLog } from './helpers.ts';
import Player from './Player.ts';
import TicTacToe from './TicTacToe.ts';

type GameMode = "player" | "computer" | "exit";

async function playAgainPrompt() {
  return select({
    message: "Do you want to play again?",
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
  });
}

function printScore(player1: Player, player2: Player) {
  const winningPlayer = player1.getScore() > player2.getScore() ? player1 : player2;

  console.log();
  console.log(chalk.bold(`Current score:`));
  console.log(`${chalk[player1.getColor()](player1.getName())}: ${player1.getScore()} ${player1.getName() === winningPlayer.getName() ? "👑" : ""}`);
  console.log(`${chalk[player1.getColor()](player2.getName())}: ${player2.getScore()} ${player2.getName() === winningPlayer.getName() ? "👑" : ""}`);
  console.log();
}

async function playerVsPlayer(player1: Player | null = null, player2: Player | null = null) {
  console.clear();
  loudLog(chalk.bgBlack.white("Player vs. Player mode"));

  let player1Name = "Player 1";
  if (!player1) {
    player1Name = await input({
      message: "Enter player 1 name",
      default: "Player 1",
    });
  }

  player1 = player1 ?? new Player(player1Name, "X", "magentaBright");
  let player2Name = "Player 2";
  if (!player2) {
    player2Name = await input({
      message: "Enter player 2 name",
      default: "Player 2",
    });
  }

  player2 = player2 ?? new Player(player2Name, "O", "blueBright");

  const game = new TicTacToe(player1, player2);
  await game.startGame();

  printScore(player1, player2);

  const playAgain = await playAgainPrompt();

  if (playAgain) {
    await playerVsPlayer(player1, player2);
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
    await playerVsPlayer();
  }
}

main();