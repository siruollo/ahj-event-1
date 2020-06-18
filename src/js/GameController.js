import GamePlay from './GamePlay';

let moveInterval = null;

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.missedMoves = 0;
    this.score = 0;
    this.unitCell = null;
    this.unit = null;
    this.missedMoves = 0;
  }

  init() {
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.characterSpawn();
    moveInterval = setInterval(this.missedMove.bind(this), 1000);
  }


  onCellClick(index) {
    if (this.unitCell === index) {
      clearInterval(moveInterval);
      this.score += 1;
      this.characterMove();
      moveInterval = setInterval(this.missedMove.bind(this), 1000);
    }
  }

  onCellEnter(index) {
    if (this.unitCell === index) {
      this.gamePlay.setCursor('pointer');
    }
  }

  onCellLeave(index) {
    if (this.unitCell === index) {
      this.gamePlay.setCursor('auto');
    }
  }

  characterSpawn() {
    const targetCell = this.gamePlay.randomCell(this.gamePlay.cells);
    const unit = document.createElement('div');
    unit.classList.add('character');
    this.gamePlay.cells[targetCell].appendChild(unit);
    this.unit = unit;
    this.unitCell = targetCell;
  }

  characterMove() {
    const allowedCells = [...this.gamePlay.cells];
    allowedCells.splice(this.unitCell, 1);
    const targetCell = this.gamePlay.randomCell(allowedCells);
    this.unitCell = targetCell;
    this.gamePlay.cells[targetCell].appendChild(this.unit);
  }

  missedMove() {
    this.missedMoves += 1;
    if (this.missedMoves >= 5) {
      clearInterval(moveInterval);
      this.endGame();
    }
    this.characterMove();
  }

  endGame() {
    GamePlay.showError('Game over');
  }
}
