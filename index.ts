import chalk from 'chalk';
import { select } from '@inquirer/prompts';


type GameMode = "player" | "computer" | "exit";

async function main() {
  const mode: GameMode = await select({
    message: "Select game mode",
    choices: [
      { name: "Player", value: "player" },
      { name: "Computer", value: "computer" },
      { name: "Exit", value: "exit" },
    ],
  });

  if (mode === "exit") {
    console.log(chalk.red("Exiting..."));
    return
  }

  if (mode === "computer") {
    // not implemented yet
    console.log(chalk.red("Computer mode not implemented yet"));
    return;
  }
}

main();
