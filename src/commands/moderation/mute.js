module.exports = {
  name: 'mute',
  aliases: ['silence', 'muet'],
  category: 'moderation',
  async execute(sock, msg, args, from) {
    const target = args[0] || 'inconnu';
    await sock.sendMessage(from, { text: `${target} a été mis en muet (simulation).` });
  },
};
