const { getGameState } = require('./modules/state');
const { decipherText } = require('./modules/crypto');

module.exports = {
  name: 'deal',
  execute(message, args) {
    if (!message.author.bot && message.author.id != process.env.ADMIN_ID) return;

    console.log(`got deal=${args[0]}`);
    let encryptedDice = args[0];

    const gameState = getGameState();
    decipherText(encryptedDice, process.env.AES_KEY, (decrypted) => {
      let dice = decrypted.split(' ');
      dice = dice.map(die => +die);
      gameState.reset();
      gameState.dice = dice;

      console.log(gameState);
    });
  },
};