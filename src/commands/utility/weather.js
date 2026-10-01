module.exports = {
  name: 'weather',
  aliases: ['meteo', 'temp'],
  category: 'utility',
  async execute(sock, msg, args, from) {
    const city = args.join(' ') || 'Paris';
    const temp = 18 + Math.floor(Math.random() * 15);
    await sock.sendMessage(from, {
      text: `Météo pour ${city} : ${temp}°C, ciel variable.`,
    });
  },
};
