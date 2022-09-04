// class LoginBot {
//   constructor(browser, page, url) {
//     this.browser = browser
//     this.page = page
//     this.url = url
//   }

//   async login () {
//     const { isLoggedIn, el } = await this.isLoggedIn()

//     if (!isLoggedIn) {
//       await el.evaluate(el => el.click())
//       await this.page.waitForNavigation({ waitUntil: 'load' })

//       await this.fillFields()

//       const [entrarBtn] = await this.page.$x('//button[contains(text(), "Entrar")]')
//       await entrarBtn?.click()
//     }

//     await this.page.goto(this.url)
//   }

//   async fillFields () {
//     await this.page.type("input[type='email']", 'resas21003@lurenwu.com')
//     await this.page.type("input[type='password']", '40028922dD$')
//   }

//   async isLoggedIn () {
//     await this.page.click('button.sc-jtRlXQ.ekzRAa')
//     const textEl = await this.page.$('a.profile-link')
//     const isLoggedIn = await textEl.evaluate(el => el.textContent !== 'Entrar')
//     return { isLoggedIn, el: textEl }
//   }
// }

class LoginBot {
  constructor(browser, page, url) {
    this.browser = browser
    this.page = page
    this.url = url
  }

  async login () {
    await this.fillFields()

    const hasUrlChanged = () => new Promise(res => {
      this.page.on("framenavigated", async () => res(true))
    });

    return hasUrlChanged()
  }

  async fillFields () {
    await this.page.waitForXPath('//span[contains(text(), "Entrar com o Facebook")]')
    const [entrarBtn] = await this.page.$x('//span[contains(text(), "Entrar com o Facebook")]')
    await entrarBtn?.click()

    await this.page.on('popup', async (e) => {
      const [email, pass] = await Promise.all([
        e.waitForSelector('#email'),
        e.waitForSelector('#pass')
      ])

      await email.type("davifeitosa.ft@gmail.com")
      await pass.type("VD%$P5Wef@C?f")

      await e.keyboard.press('Enter')
    })
  }

}

module.exports = LoginBot