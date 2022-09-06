// const { TimeoutError } = require("puppeteer");

class PostsGetterBot {
  constructor(browser, page) {
    this.browser = browser
    this.page = page
  }

  async start () {

  }

  async getNumberOfPages () {
    try {
      await this.page.waitForSelector('p.sc-bdVaJa.iVpJPn', { timeout: 2000 })
      const a = await this.page.$('p.sc-bdVaJa.iVpJPn')
      const text = await a.evaluate(el => el.textContent)
      const numberOfPages = text.split('de ')[1]
      console.log({ numberOfPages });
      return Number(numberOfPages)
    } catch (error) {
      // if (error instanceof TimeoutError) {
      // se não tiver escrito o número de pags, é pq só tem uma
      return 1
      // }
    }
  }

  async getAllPosts (query) {
    const numberOfPages = await this.getNumberOfPages()

    const totalOfPosts = []
    if (numberOfPages > 1) {
      console.log({ numberOfPages });
      for (let i = 1; i < numberOfPages + 1; i++) {
        await this.page.goto(`https://df.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios?q=${query}&o=${i}`, { waitUntil: 'domcontentloaded' })
        const posts = await this.getPosts()
        console.log({ posts });
        totalOfPosts.push(...posts)
      }
    } else {
      return await this.getPosts()
    }
    return totalOfPosts
  }

  async getPosts () {
    const postsLink = await this.page.evaluate(
      () => Array.from(
        document.querySelectorAll('.sc-12rk7z2-0.bjnzhV > a'),
        a => a.getAttribute('href')
      )
    );
    return postsLink
  }
}

module.exports = PostsGetterBot