const { getGameState } = require('./modules/state');

module.exports = {
  name: 'reset',
  execute(message) {
    if (message.author.id != process.env.ADMIN_ID) return;
    const gameState = getGameState();
    console.log(gameState);
    gameState.reset();
  },
};