const { getGameState } = require('./modules/state');
const { respond } = require('./modules/perudo');


module.exports = {
  name: 'update',
  execute(message, args) {
    if (!message.author.bot && message.author.id != process.env.ADMIN_ID) return;

    console.log(`got update=${args[0]}`);
    let updates = JSON.parse(args[0]);

    const gameState = getGameState();
    gameState.update(updates);

    respond(gameState, message.channel);
    console.log(gameState);
  },
};