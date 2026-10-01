module.exports = {
  name: 'ban',
  aliases: ['bannir'],
  category: 'admin',
  async execute(sock, msg, args, from) {
    const target = args[0] || 'inconnu';
    await sock.sendMessage(from, { text: `Utilisateur ${target} banni (simulation).` });
  },
};
