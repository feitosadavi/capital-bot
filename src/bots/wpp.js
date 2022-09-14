const TelegramBot = require('node-telegram-bot-api');
const Bot = require('./bot');
const Messenger = require('./messenger');
const PostsGetterBot = require('./posts-getter');

const token = '5635421748:AAHZt82NYi295ufuRsV92W_YiY8kzkoVF0Q';
const telegramBot = new TelegramBot(token, { polling: true });

// const openChrome = () => new Promise(res => {
//   spawn('google-chrome', ['--remote-debugging-port=9222'])
//   res(true)
// })


const olxBot = new Bot()
telegramBot.on('message', (msg) => {
  try {
    if (olxBot.getIsBusy()) {
      telegramBot.sendMessage(msg.chat.id, 'Estou ocupado! Aguarde.')
    } else {
      telegramBot.sendMessage(msg.chat.id, 'Pesquisa em execução! Aguarde.')
      olxBot.init(async () => {
        olxBot.start()

        const query = msg.text

        const postsGetterBot = new PostsGetterBot(olxBot.browser, olxBot.page)


        await olxBot.search(query)

        const totalOfPosts = await postsGetterBot.getAllPosts(query)

        console.log({ totalOfPosts });
        if (totalOfPosts.length > 0) {
          console.log(totalOfPosts.length);
          const messenger = new Messenger(olxBot.browser, olxBot.page)
          for (let i = 0; i < totalOfPosts.length; i++) {
            console.log(totalOfPosts[i]);
            await messenger.sendMessage(totalOfPosts[i])
          }
          await olxBot.page.close()
        }

        olxBot.finish()
        telegramBot.sendMessage(msg.chat.id, 'Tudo certo! Estou disponível!')
      })
    }
  } catch (error) {
    console.log(error);
    telegramBot.sendMessage(msg.chat.id, String(error))
    telegramBot.sendMessage(msg.chat.id, 'Houve um erro durante a pesquisa, tente novamente!')
  }

});