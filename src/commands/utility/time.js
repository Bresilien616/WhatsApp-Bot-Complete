module.exports = {
  name: 'time',
  aliases: ['heure', 'date'],
  category: 'utility',
  async execute(sock, msg, args, from) {
    const now = new Date();
    await sock.sendMessage(from, {
      text: `Heure actuelle : ${now.toLocaleTimeString()}\nDate : ${now.toLocaleDateString()}`,
    });
  },
};
