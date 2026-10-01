const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  Browsers,
} = require('@whiskeysockets/baileys');
const readline = require('readline');

const { loadCommands } = require('./src/commandLoader');
const config = require('./src/config');
const { log } = require('./src/utils/logger');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    browser: Browsers.ubuntu('Desktop'),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      log('Scanne le QR code ou utilise la méthode .pair()');
    }

    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      log(`Connexion fermée. Reconnexion : ${shouldReconnect}`);

      if (shouldReconnect) {
        connectBot();
      }
    } else if (connection === 'open') {
      log('Bot connecté et prêt à recevoir des messages.');
      rl.close();
    }
  });

  if (!state.creds.me?.id) {
    const phoneNumber = await question(
      'Entre ton numéro WhatsApp (format international, ex: 33612345678) : '
    );

    try {
      const code = await sock.requestPairingCode(phoneNumber);
      log(`Code d'appairage : ${code}`);
      log(
        'Entre ce code dans WhatsApp > Paramètres > Appareils connectés > Ajouter un appareil.'
      );
    } catch (error) {
      log("Erreur lors de la génération du code d'appairage : " + error.message);
      rl.close();
      process.exit(1);
    }
  }

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg || !msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      '';

    if (!text || !text.startsWith(config.prefix)) return;

    const trimmed = text.slice(config.prefix.length).trim();
    const [commandName, ...args] = trimmed.split(/\s+/);
    const commands = loadCommands();
    const command = commands[commandName.toLowerCase()];

    if (!command) {
      await sock.sendMessage(from, {
        text: `Commande inconnue. Tape *${config.prefix}menu* pour voir la liste.`,
      });
      return;
    }

    try {
      await command.execute(sock, msg, args, from, config);
    } catch (error) {
      console.error(error);
      await sock.sendMessage(from, {
        text: 'Erreur interne du bot. Réessaie plus tard.',
      });
    }
  });
}

connectBot();
