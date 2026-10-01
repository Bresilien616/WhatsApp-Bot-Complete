module.exports = {
  name: 'random',
  aliases: ['alea', 'choice'],
  category: 'random',
  async execute(sock, msg, args, from) {
    const items = args.length ? args : ['oui', 'non', 'peut-être'];
    const choice = items[Math.floor(Math.random() * items.length)];
    await sock.sendMessage(from, { text: `Choix aléatoire : ${choice}` });
  },
};
