const { loadCommands } = require('../../src/commandLoader');

module.exports = {
  name: 'help',
  aliases: ['aide', 'cmds', 'commands'],
  category: 'utility',
  async execute(sock, msg, args, from, config) {
    const commands = loadCommands();
    const commandNames = Object.keys(commands).sort();

    const text = `Commandes disponibles :\n${commandNames
      .slice(0, 80)
      .map((name) => `• ${config.prefix}${name}`)
      .join('\n')}`;

    await sock.sendMessage(from, { text });
  },
};
