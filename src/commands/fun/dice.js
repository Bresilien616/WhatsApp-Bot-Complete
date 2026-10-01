module.exports = {
  name: 'dice',
  aliases: ['de', 'roll'],
  category: 'fun',
  async execute(sock, msg, args, from) {
    const value = Math.floor(Math.random() * 6) + 1;
    await sock.sendMessage(from, { text: `🎲 Résultat du dé : ${value}` });
  },
};
