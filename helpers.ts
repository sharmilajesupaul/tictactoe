import ora from 'ora';

export async function smallDelaySpinner(spinnerText = '') {
  // add a small delay to make the game more enjoyable
  const spinner = ora(spinnerText).start();
  await new Promise((resolve) => setTimeout(resolve, 500));
  spinner.stop();
}