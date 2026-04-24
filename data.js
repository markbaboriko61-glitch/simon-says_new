class SimonData {
  constructor() {
    this.sequence = [];
    this.playerSequence = [];
    this.level = 0;
    this.highScore = Number(localStorage.getItem("simonHighScore")) || 0;
  }

  resetForNewGame() {
    this.sequence = [];
    this.level = 0;
  }

  prepareNewRound() {
    this.playerSequence = [];
    this.level++;
    this.sequence.push(Math.floor(Math.random() * 4));
  }

  saveHighScore() {
    this.highScore = Math.max(this.highScore, this.level);
    localStorage.setItem("simonHighScore", this.highScore);
  }

  addPlayerClick(padId) {
    this.playerSequence.push(padId);
  }

  checkCurrentClick() {
    const currentIndex = this.playerSequence.length - 1;
    return this.playerSequence[currentIndex] === this.sequence[currentIndex];
  }

  isRoundComplete() {
    return this.playerSequence.length === this.sequence.length;
  }
}
