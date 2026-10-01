module.exports = {
  name: 'joke',
  aliases: ['blague', 'humour'],
  category: 'fun',
  async execute(sock, msg, args, from) {
    const jokes = [
      'Pourquoi le code ne dort jamais ? Parce qu’il a trop de bugs.',
      'Qu’est-ce qu’un développeur dit avant de dormir ? J’ai fini le projet… demain.',
      'Pourquoi les informaticiens aiment-ils le café ? Parce qu’ils ont besoin d’un boost.',
      'Quel est le meilleur ami d’un développeur ? Son terminal.',
    ];

    const chosen = jokes[Math.floor(Math.random() * jokes.length)];
    await sock.sendMessage(from, { text: chosen });
  },
};
