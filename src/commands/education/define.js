module.exports = {
  name: 'define',
  aliases: ['definition', 'df'],
  category: 'education',
  async execute(sock, msg, args, from) {
    const term = args.join(' ') || 'code';
    await sock.sendMessage(from, {
      text: `Définition de ${term} : un terme ou un objet lié à une opération ou à un concept précis, selon le contexte.`,
    });
  },
};
