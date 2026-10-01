module.exports = {
  name: 'sticker',
  aliases: ['stick'],
  category: 'media',
  async execute(sock, msg, args, from) {
    await sock.sendMessage(from, { text: 'Commande sticker prête à être branchée avec une vraie génération d’image.' });
  },
};
