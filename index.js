const fs = require('fs');
const Discord = require('discord.js');
const perudoUpdate = require('./perudo/update');
const perudoDeal = require('./perudo/deal');
const perudoReset = require('./perudo/reset');

require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const perudoPrefix = '@bots';
const botPrefix = `<@!${process.env.BOT_ID}>`

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.commands.set(perudoUpdate.name, perudoUpdate);
client.commands.set(perudoDeal.name, perudoDeal);
client.commands.set(perudoReset.name, perudoReset);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  const cleanMessage = message.content.replace(/[`|]/g, '');
  if (!cleanMessage.startsWith(botPrefix) && !cleanMessage.startsWith(perudoPrefix)) return;

  if (cleanMessage.startsWith(botPrefix) && !cleanMessage.slice(botPrefix.length).trim()) {
    message.reply(`hello`);
    return;
  }

  const prefix = cleanMessage.startsWith(botPrefix) ? botPrefix : perudoPrefix;
  const args = cleanMessage.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    console.log(`Unable to execute command ${command}`);
  }
});

client.login(process.env.BOT_TOKEN);