const { TimeoutError } = require("puppeteer");
const Bot = require("./bots/bot");

(async () => {
  const query = ':fiat'
  const sanitizedQuery = query.substring(
    query.indexOf(':') + 1,
  );
  console.log(sanitizedQuery)
  if (sanitizedQuery.length > 0) {
    const bot = new Bot()
    bot.init(async () => {
      const postsGetterBot = new PostsGetterBot(bot.browser, bot.page)
      await bot.search(sanitizedQuery)
      const numberOfPages = await postsGetterBot.getNumberOfPages()

      const totalOfPosts = []
      if (numberOfPages > 1) {
        console.log({ numberOfPages });
        for (let i = 1; i < numberOfPages + 1; i++) {
          await bot.search(`${sanitizedQuery}&o=${i}`)
          const posts = await postsGetterBot.getPosts()
          totalOfPosts.push(...posts)
        }
      } else {
        const posts = await postsGetterBot.getPosts()
        totalOfPosts.push(...posts)
      }

      if (totalOfPosts.length > 0) {
        console.log(totalOfPosts.length);
        // const messenger = new Messenger(bot.browser, bot.page)
        // for (let i = 0; i < totalOfPosts.length; i++) {
        //   await messenger.sendMessage(totalOfPosts[i])
        // }
      }

      console.log('ACABOOOOO')
    })
  }
})()
