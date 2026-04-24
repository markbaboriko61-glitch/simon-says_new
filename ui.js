class SimonUI {
  constructor() {
    this.board = document.getElementById("game-board");
    this.pads = document.querySelectorAll(".pad");
    this.startBtn = document.getElementById("start-btn");
    this.statusDisplay = document.getElementById("status-display");
    this.currentLevelDisplay = document.getElementById("current-level");
    this.highScoreDisplay = document.getElementById("high-score");

    this.colorFunctions = {
      0: () => this.highlightRed(),
      1: () => this.highlightGreen(),
      2: () => this.highlightBlue(),
      3: () => this.highlightYellow(),
    };
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  updateDisplays(level, highScore) {
    if (level !== undefined) this.currentLevelDisplay.textContent = level;
    if (highScore !== undefined) this.highScoreDisplay.textContent = highScore;
  }

  setStatus(text, color = "#aaa") {
    this.statusDisplay.textContent = text;
    this.statusDisplay.style.color = color;
  }

  setBoardDisabled(isDisabled) {
    if (isDisabled) {
      this.board.classList.add("disabled");
    } else {
      this.board.classList.remove("disabled");
    }
  }

  setStartBtnState(isDisabled, text = "Старт") {
    this.startBtn.disabled = isDisabled;
    this.startBtn.textContent = text;
  }

  async highlightBase(id) {
    const pad = document.querySelector(`.pad-${id}`);
    pad.classList.add("active");
    await this.delay(400);
    pad.classList.remove("active");
  }

  async highlightRed() {
    await this.highlightBase(0);
  }
  async highlightGreen() {
    await this.highlightBase(1);
  }
  async highlightBlue() {
    await this.highlightBase(2);
  }
  async highlightYellow() {
    await this.highlightBase(3);
  }

  async playSequence(sequence) {
    for (let i = 0; i < sequence.length; i++) {
      await this.colorFunctions[sequence[i]]();
      await this.delay(300);
    }
  }
}
