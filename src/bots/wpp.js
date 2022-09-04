const venom = require('venom-bot');
const Bot = require('./bot');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start (client) {
  client.onMessage((message) => {
    console.log(message)
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      const sanitizedMsg = sanitizeMsg(message.body)
      const bot = new Bot()
      bot.init(async () => {

      }, sanitizedMsg)
      // client
      //   .sendText(message.from, 'Welcome Venom 🕷')
      //   .then((result) => {
      //     console.log('Result: ', result); //return object success
      //   })
      //   .catch((erro) => {
      //     console.error('Error when sending: ', erro); //return object error
      //   });
    }
  });
}

function sanitizeMsg (msg) {
  return msg
}