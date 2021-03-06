const Strategy = require('./strategy');

class ExampleStrategy extends Strategy {
  
  getResponseAction() {
    const dice = this._gameState.dice;
    const history = this._gameState.history;
    const totalDice = this._gameState.diceCount;
    const lastActionIndex = this._gameState.getLastAction();

    const actionKey = generateActions(totalDice);
    
    console.log(`dice=${dice}`);
    console.log(`history=${history}`);
    console.log(`totalDice=${totalDice}`);
    console.log(`lastActionIndex=${lastActionIndex}`);

    // To respond with liar, return largest possible bid plus one
    // return actionKey.length

    // To respond with exact, return largest possible bid plus two
    // return actionKey.length + 1

    if (lastActionIndex != null) {
      console.log(`lastAction=${actionKey[lastActionIndex]}`);
      return lastActionIndex + 1;
    }
    
    // If lastActionIndex is null, that means we are the first to bid.
    // Return index 0 which is 1x2
    return 0;
  }
}

module.exports = ExampleStrategy;