class GameState {
  constructor() {
    this.history = [];
    this.round = null;
    this.nextPlayer = null;
    this.diceCount = null;
    this.dice = null;
  }

  reset() {
    this.history = [];
    this.round = null;
    this.nextPlayer = null;
    this.diceCount = null;
    this.dice = null;
  }

  getLastAction() {
    if (this.history.length == 0) return null;
    return this.history.slice(-1)[0];
  }

  update(updates) {
    if (!updates) return;

    if ('round' in updates) {
      this.round = updates.round;
    }

    if ('action' in updates) {
      this.history.push(updates['action']);
    }

    if ('nextPlayer' in updates) {
      this.nextPlayer = updates['nextPlayer'];
    }

    if ('diceCount' in updates) {
      this.diceCount = updates['diceCount'];
    }
  }
}

// TODO: Store this in a DB
const GAMESTATES = []

const getGameState = () => {
  if (GAMESTATES.length == 0) {
    const gamestate = new GameState();
    GAMESTATES.push(gamestate);
  }
  return GAMESTATES[0];
}

module.exports = {
  getGameState
}