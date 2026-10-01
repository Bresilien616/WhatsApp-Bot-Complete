module.exports = {
  name: 'warn',
  aliases: ['avertir'],
  category: 'admin',
  async execute(sock, msg, args, from) {
    const target = args[0] || 'inconnu';
    await sock.sendMessage(from, { text: `Avertissement donné à ${target}.` });
  },
};
