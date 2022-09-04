const readline = require('readline');
const EventEmmiter = require('events')

const LoginBot = require("./bots/auth")
const Bot = require("./bots/bot");
const { Cluster } = require('puppeteer-cluster');

class PostsGetterBot {
  constructor(browser, page) {
    this.browser = browser
    this.page = page
  }

  async getPosts () {
    return this.page.$$('.kgl1mq-0.eFXRHn.sc-fzsDOv.jiCiNE')
  }

  async openPostInNewTab (post) {
    await post.click()
    // await this.page.waitForNavigation()
    // return newPage
  }

  async goToCurrentPostTab () {
    const postTab = await this.getCurrentPostTab()
    await postTab?.bringToFront()
  }

  async goBackward () {
    await this.page.goBack()
    await this.page.waitForNavigation()
  }

  async closeCurrentPostTab () {
    const postTab = await this.getCurrentPostTab()
    await postTab?.close()
  }

  async getCurrentPostTab () {
    await this.page.waitForTimeout(500)
    const pages = await this.browser.pages()
    return pages[2]
  }
}

class Messenger {
  constructor(browser, page) {
    this.browser = browser
    this.page = page
  }

  async clickChatBtn (page) {
    await page.waitForSelector('div.sc-1wfs6j-0.jacUhS')
    const chatBtn = await page.$('div.sc-1wfs6j-0.jacUhS')
    await chatBtn.click()

    await page.waitForSelector('textarea')
    const previousMsg = await page.$('div.sc-hzDEsm.eLnGKm.sc-RWGNv.dFRSXj')
    if (!previousMsg) {
      await page.type('textarea', '.') // MENSAGEM
      await page.click('div.sc-hzDEsm.sc-dOkuiw.ctPZrs')
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


const emitter = new EventEmmiter()
const toQuestion = () => {
  rl.question('Digite o que deseja pesquisar: ', (query) => {
    emitter.emit('query', query)
  })
}

const run = async (query) => {
  const bot = new Bot()
  bot.init(async () => {
    emitter.emit('ask')

    await bot.search(query)

    const messenger = new Messenger(bot.browser, bot.page)
    const postsGetterBot = new PostsGetterBot(bot.browser, bot.page)
    const posts = await postsGetterBot.getPosts()

    console.log(posts)
    for (let i = 0; i < posts.length; i++) {
      console.log(i)
      await postsGetterBot.openPostInNewTab(posts[i])
      await messenger.clickChatBtn(bot.page)
      await postsGetterBot.goBackward()
    }
  }).catch(console.error)
}

(async () => {
  console.log("dkjfk")
  emitter.on('query', async (query) => {
    await run(query)
    // const URL = 'https://df.olx.com.br/distrito-federal-e-regiao/autos-e-pecas/carros-vans-e-utilitarios/?q='
    // const cluster = await Cluster.launch({
    //   concurrency: Cluster.CONCURRENCY_PAGE,
    //   maxConcurrency: 2,
    // });
    // await cluster.task(async ({ page }) => run(page, query))
    // await cluster.queue(`${URL}${query}`)
  })
  toQuestion()
  emitter.on('ask', toQuestion)
})()
