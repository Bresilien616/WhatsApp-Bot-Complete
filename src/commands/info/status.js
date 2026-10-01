module.exports = {
  name: 'status',
  aliases: ['botstatus', 'etat'],
  category: 'info',
  async execute(sock, msg, args, from) {
    await sock.sendMessage(from, {
      text: 'Bot en ligne et prêt à répondre.',
    });
  },
};
