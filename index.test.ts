import { it, expect, describe, jest } from '@jest/globals';
import { TicTacToe } from './index.ts';
import Player from './Player.ts';
import chalk from 'chalk';

// TODO: Fix this test it doesn't exit properly since the game loop never ends
describe('TicTacToe', () => {
  let player1: Player;
  let player2: Player;
  let game: TicTacToe;

  beforeEach(() => {
    player1 = new Player('Player 1', 'X');
    player2 = new Player('Player 2', 'O');
    game = new TicTacToe(player1, player2);
  });

  it('should initialize correctly', () => {
    expect(game).toBeInstanceOf(TicTacToe);
    expect(game['player1']).toBe(player1);
    expect(game['player2']).toBe(player2);
    expect(game['board']).toEqual([
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
    ]);
  });

  it('should print the board correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    game.printBoard();
    expect(consoleSpy.mock.calls[0][0]).toMatchInlineSnapshot(`
"0 | 1 | 2
---------
3 | 4 | 5
---------
6 | 7 | 8"
`)
    consoleSpy.mockRestore();
  });

  it('should update the board correctly', () => {
    game.updateBoard(0, 'X');
    expect(game['board'][0][0]).toBe('X');
  });

  it('should identify the winner correctly', () => {
    game['board'] = [
      ["X", "X", "X"],
      ["3", "4", "5"],
      ["6", "7", "8"],
    ];
    expect(game.checkWinner()).toBe('X');

    game['board'] = [
      ["0", "1", "2"],
      ["O", "O", "O"],
      ["6", "7", "8"],
    ];
    expect(game.checkWinner()).toBe('O');

    game['board'] = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["X", "X", "X"],
    ];
    expect(game.checkWinner()).toBe('X');

    game['board'] = [
      ["X", "1", "2"],
      ["X", "4", "5"],
      ["X", "7", "8"],
    ];
    expect(game.checkWinner()).toBe('X');

    game['board'] = [
      ["0", "X", "2"],
      ["3", "X", "5"],
      ["6", "X", "8"],
    ];
    expect(game.checkWinner()).toBe('X');

    game['board'] = [
      ["0", "1", "X"],
      ["3", "4", "X"],
      ["6", "7", "X"],
    ];
    expect(game.checkWinner()).toBe('X');

    game['board'] = [
      ["X", "1", "2"],
      ["3", "X", "5"],
      ["6", "7", "X"],
    ];
    expect(game.checkWinner()).toBe('X');

    game['board'] = [
      ["0", "1", "X"],
      ["3", "X", "5"],
      ["X", "7", "8"],
    ];
    expect(game.checkWinner()).toBe('X');

    game['board'] = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
    ];
    expect(game.checkWinner()).toBe(null);
  });
  
  // TODO: Fix this test
  it.skip('should start the game correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    game.startGame();
    expect(consoleSpy).toHaveBeenCalledWith(chalk.blue("Game started!"));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.green("Player 1 is X"));
    expect(consoleSpy).toHaveBeenCalledWith(chalk.green("Player 2 is O"));
    consoleSpy.mockRestore();
  });
});