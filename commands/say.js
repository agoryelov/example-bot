module.exports = {
  name: 'say',
  execute(message, args) {
    if (message.author.id != process.env.ADMIN_ID) return;
    let reply = args.join(' ');
    message.channel.send(`${reply}`);
  },
};