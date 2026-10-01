module.exports = {
  name: 'menu',
  aliases: ['start', 'categories'],
  category: 'system',
  async execute(sock, msg, args, from, config) {
    const text = `
${config.botName}

Catégories :
• admin
• fun
• utility
• info
• system
• games
• moderation
• tools
• education
• random
• media

Exemples :
${config.prefix}help
${config.prefix}ping
${config.prefix}menu
${config.prefix}joke
`;

    await sock.sendMessage(from, { text });
  },
};
