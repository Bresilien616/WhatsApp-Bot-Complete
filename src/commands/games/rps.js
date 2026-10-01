module.exports = {
  name: 'rps',
  aliases: ['pierre', 'feuille', 'ciseaux'],
  category: 'games',
  async execute(sock, msg, args, from) {
    const choices = ['pierre', 'feuille', 'ciseaux'];
    const bot = choices[Math.floor(Math.random() * choices.length)];
    const userChoice = (args[0] || '').toLowerCase();

    if (!choices.includes(userChoice)) {
      await sock.sendMessage(from, { text: 'Utilisation : !rps pierre|feuille|ciseaux' });
      return;
    }

    const wins = {
      pierre: 'ciseaux',
      feuille: 'pierre',
      ciseaux: 'feuille',
    };

    let result = 'Égalité !';
    if (wins[userChoice] === bot) {
      result = 'Tu gagnes !';
    } else if (userChoice !== bot) {
      result = 'Je gagne !';
    }

    await sock.sendMessage(from, {
      text: `Tu as choisi ${userChoice}, moi j’ai choisi ${bot}. ${result}`,
    });
  },
};
