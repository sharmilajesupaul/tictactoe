class Player {
  private name: string;
  private icon: string;
  private score: number = 0;
  private positions: number[] = [];

  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
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
