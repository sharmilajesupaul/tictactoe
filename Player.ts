import type { ColorName } from "chalk";
class Player {
  private name: string;
  private icon: string;
  private score: number = 0;
  private positions: number[] = [];
  private color: ColorName;

  constructor(name: string, icon: string, color: ColorName) {
    this.name = name;
    this.icon = icon;
    this.color = color;
  }

  getName() {
    return this.name;
  }

  getIcon() {
    return this.icon;
  }

  getScore() {
    return this.score;
  }

  getColor() {
    return this.color;
  }

  incrementScore() {
    this.score++;
  }

  resetScore() {
    this.score = 0;
  }

  getPositions() {
    return this.positions;
  }

  addPosition(position: number) {
    this.positions.push(position);
  }

  resetPositions() {
    this.positions = [];
  }
}

export default Player;
