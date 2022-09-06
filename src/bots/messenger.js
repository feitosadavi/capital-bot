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

    await this.page.waitForSelector('div.sc-1wfs6j-0.jacUhS')
    await this.page.click('div.sc-1wfs6j-0.jacUhS')
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
    await this.page.type('textarea', '.') // MENSAGEM
  }
}

module.exports = Messenger