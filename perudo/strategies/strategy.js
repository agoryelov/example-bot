class Strategy {
  constructor(gameState) {
    this._gameState = gameState;
  }

  /**
   * Must return action index of the reponse action.
   */
  getResponseAction() {
    throw new Error("Not implemented.");
  }
}

module.exports = Strategy;