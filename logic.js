class SimonLogic {
  constructor(data, ui) {
    this.data = data;
    this.ui = ui;
    this.ui.updateDisplays(this.data.level, this.data.highScore);
    this.initEventListeners();
  }

  initEventListeners() {
    this.ui.startBtn.addEventListener("click", () => this.startGame());

    this.ui.pads.forEach((pad) => {
      pad.addEventListener("click", (e) => {
        this.handlePlayerClick(parseInt(e.target.dataset.id));
      });
    });
  }

  async startGame() {
    this.ui.setStartBtnState(true);
    this.data.resetForNewGame();
    await this.startNextRound();
  }

  async startNextRound() {
    this.data.prepareNewRound();
    this.ui.updateDisplays(this.data.level);
    this.ui.setBoardDisabled(true);

    this.ui.setStatus("Ready...");
    await this.ui.delay(800);
    this.ui.setStatus("Set...");
    await this.ui.delay(800);
    this.ui.setStatus("Go!");
    await this.ui.delay(600);

    this.ui.setStatus("Смотрите и запоминайте");
    await this.ui.playSequence(this.data.sequence);

    this.ui.setStatus("Ваш ход!");
    this.ui.setBoardDisabled(false);
  }

  async roundWon() {
    this.ui.setBoardDisabled(true);
    this.ui.setStatus("Отлично!");
    await this.ui.delay(1000);
    this.startNextRound();
  }

  gameOver() {
    this.ui.setBoardDisabled(true);
    this.ui.setStatus("Ошибка! Игра окончена.", "#ff4444");

    setTimeout(() => {
      this.ui.setStatus(`Вы достигли уровня: ${this.data.level}`);
      this.ui.setStartBtnState(false, "Сыграть снова");
    }, 1500);

    this.data.saveHighScore();
    this.ui.updateDisplays(undefined, this.data.highScore);
  }

  handlePlayerClick(padId) {
    this.ui.colorFunctions[padId]();
    this.data.addPlayerClick(padId);

    const isCorrect = this.data.checkCurrentClick();
    const isComplete = this.data.isRoundComplete();

    const gameLogic = {
      false: () => this.gameOver(),
      true: () => {
        const roundLogic = {
          true: () => this.roundWon(),
          false: () => {},
        };
        roundLogic[isComplete]();
      },
    };

    gameLogic[isCorrect]();
  }
}

const gameData = new SimonData();
const gameUI = new SimonUI();
const game = new SimonLogic(gameData, gameUI);
