module.exports = {
  name: 'calc',
  aliases: ['calcul', 'calculator'],
  category: 'utility',
  async execute(sock, msg, args, from) {
    const expression = args.join(' ');
    if (!expression) {
      await sock.sendMessage(from, { text: 'Utilisation : !calc 10+5' });
      return;
    }

    try {
      const value = Function(`"use strict"; return (${expression})`)();
      await sock.sendMessage(from, { text: `Résultat : ${value}` });
    } catch (error) {
      await sock.sendMessage(from, { text: 'Expression invalide.' });
    }
  },
};
