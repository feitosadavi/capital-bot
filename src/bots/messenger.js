class Messenger {
  constructor(browser, page) {
    this.browser = browser
    this.page = page
  }

  async sendMessage (postUrl) {
    await this.clickChatBtn(postUrl)
    const hasSentPreviousMessages = await this.hasSentPreviousMessages()
    console.log({ hasSentPreviousMessages });
    if (!hasSentPreviousMessages) {
      await this.typeMessage()
      const sendBtn = await this.page.$('div.sc-hzDEsm.sc-dOkuiw.ctPZrs')
      await sendBtn?.click()
    }

  }

  async clickChatBtn (postUrl) {
    await this.page.goto(postUrl, { waitUntil: 'domcontentloaded' })
    try {
      await this.page.waitForSelector('button#cookie-notice-ok-button')
      await this.page.click('button#cookie-notice-ok-button')
      await this.page.waitForSelector('div.sc-1wfs6j-0.jacUhS')
      await this.page.click('div.sc-1wfs6j-0.jacUhS')
    } catch (error) {
      await this.page.waitForSelector('div.sc-1wfs6j-0.jacUhS')
      await this.page.click('div.sc-1wfs6j-0.jacUhS')
    }
  }

  async hasSentPreviousMessages () {
    try {
      await this.page.waitForSelector('div.sc-hzDEsm.eLnGKm.sc-RWGNv.dFRSXj', { timeout: 4000 })
      const previousMsg = await this.page.$('div.sc-hzDEsm.eLnGKm.sc-RWGNv.dFRSXj')
      console.log({ previousMsg });
      return !!previousMsg
    } catch (error) {
      // if (error instanceof TimeoutError) {
      // se não tiver mensagens anteriores, retorna false
      return false
      // }
    }
  }

  async typeMessage () {
    await this.page.waitForSelector('textarea')
    await this.page.type('textarea', 'Não perca mais tempo e não corra risco com fraudes, nós da Capital Veículos vendemos seu carro com rapidez e segurança em 10 dias, ou compramos! E o melhor, você não precisa deixar seu carro na loja para vender. Temos uma equipe especializada e os maiores canais em venda de carros do mercado. Não perca mais tempo, entre em contato agora mesmo! U+1F600')
  }
}

module.exports = Messenger