const ExampleStrategy = require('../strategies/example');
const { generateActions } = require('./math');

const actionToBidString = (action, actionKey) => {
  let a = actionKey[action];
  return `!bid ${a[0]} ${a[1]}`
}

const respond = (gameState, discordChannel) => {
  if (gameState.dice == null) {
    console.log(`respond: don't have my dice yet`);
    return;
  }

  if (gameState.nextPlayer != process.env.BOT_ID) {
    console.log(`respond: not my turn`);
    return;
  }

  const actionKey = generateActions(gameState.diceCount);
  const numActions = actionKey.length;
  const lastAction = gameState.getLastAction();
  const delay = parseInt(process.env.DELAY);

  if (lastAction >= numActions) {
    console.log(`respond: !liar (action ${lastAction} of ${numActions} too improbable)`);
    setTimeout(() => discordChannel.send(`!liar`), 1000 + delay);
    return;
  }

  const strategy = new ExampleStrategy(gameState);
  const action = strategy.getResponseAction();

  if (action == numActions) {
    console.log(`respond: !liar`);
    setTimeout(() => discordChannel.send(`!liar`), 1000 + delay);
    return;
  }

  if (action == numActions + 1) {
    console.log(`respond: !exact`);
    setTimeout(() => discordChannel.send(`!exact`), 1000 + delay);
    return;
  }

  const bidString = actionToBidString(action, actionKey);
  console.log(`respond: ${bidString}`);
  setTimeout(() => discordChannel.send(bidString), delay);
}

module.exports = {
  respond
}