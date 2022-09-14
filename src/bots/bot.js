'use strict'

const fetch = require('axios')
const puppeteer = require('puppeteer-extra')

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const LoginBot = require('./auth');

const PORT = 9222

class Bot {
  isBusy = false

  async init (callback) {
    console.log({ PORT })
    fetch(`http://127.0.0.1:${PORT}/json/version`).then(async (res) => {
      this.browser = await puppeteer.connect({
        browserWSEndpoint: res.data.webSocketDebuggerUrl
      })
      console.log({ url: res.data.webSocketDebuggerUrl });
      this.page = await this.browser.newPage()
      await this.page.setCacheEnabled(false)
      console.log('fazendo o login');
      const auth = new LoginBot(this.browser, this.page, 'https://conta.olx.com.br/acesso/')
      await auth.login()

      callback.bind(this)()
    }).catch((e) => console.log('errou', e))
  }

  async search (query) {
    await this.page.goto(`https://df.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios?q=${query}`, { waitUntil: 'domcontentloaded' })
  }

  async start () {
    this.isBusy = true
  }

  async finish () {
    this.isBusy = false
  }

  getIsBusy () {
    return this.isBusy
  }
}
// 
module.exports = Bot