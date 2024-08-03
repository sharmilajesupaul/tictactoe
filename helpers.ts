import ora from 'ora';
import chalk from 'chalk';

// add a small delay to make the game more enjoyable
export async function smallDelaySpinner(spinnerText = '') {
  const spinner = ora(spinnerText).start();
  await new Promise((resolve) => setTimeout(resolve, 300));
  spinner.stop();
}

// a loud log function that highlights the text
export function loudLog(str: string) {
  console.log(chalk.underline.bold(` ${str} `));
}