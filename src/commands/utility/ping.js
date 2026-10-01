module.exports = {
  name: 'ping',
  aliases: ['pong'],
  category: 'utility',
  async execute(sock, msg, args, from) {
    await sock.sendMessage(from, { text: 'Pong !' });
  },
};
