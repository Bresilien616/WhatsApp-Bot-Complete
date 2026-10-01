const fs = require('fs');
const path = require('path');

function loadCommands() {
  const commands = {};
  const rootDir = path.join(__dirname, 'commands');

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        const command = require(fullPath);

        if (!command || !command.name) continue;

        commands[command.name.toLowerCase()] = command;

        if (Array.isArray(command.aliases)) {
          for (const alias of command.aliases) {
            commands[alias.toLowerCase()] = command;
          }
        }
      }
    }
  }

  walk(rootDir);
  return commands;
}

module.exports = { loadCommands };
