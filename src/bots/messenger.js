const MSG = 'Não perca mais tempo e não corra risco com fraudes, nós da Capital Veículos vendemos seu carro com rapidez e segurança em 10 dias, ou compramos! E o melhor, você não precisa deixar seu carro na loja para vender. Temos uma equipe especializada e os maiores canais em venda de carros do mercado. Não perca mais tempo, entre em contato agora mesmo!'

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
      const sendBtn = await this.page.$('div.sc-hzDEsm.sc-hZeNU.enjuqn')
      await sendBtn?.click()
      console.log('MENSAGEM ENVIADA!');
    }

  }

  async clickChatBtn (postUrl) {
    await this.page.goto(postUrl, { waitUntil: 'networkidle0' })
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
      await this.page.waitForSelector(`.sc-hzDEsm.eLnGKm.sc-dTsoBL.gYWGYI`, { timeout: 2000 })
      const previousMsg = await this.page.$('.sc-hzDEsm.eLnGKm.sc-dTsoBL.gYWGYI');
      return true
    } catch (error) {
      console.log(error);
      // if (error instanceof TimeoutError) {
      // se não tiver mensagens anteriores, retorna false
      return false
      // }
    }
  }

  async typeMessage () {
    try {
      await this.page.waitForSelector('textarea')
      await this.page.type('textarea', MSG)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Messenger