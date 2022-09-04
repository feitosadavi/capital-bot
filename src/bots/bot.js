'use strict'


const puppeteer = require('puppeteer')

const wsChromeEndpointurl = 'ws://127.0.0.1:9222/devtools/browser/1ccd0536-30f9-4b68-926b-17eb8e419b07'

class Bot {
  async init (callback) {
    this.browser = await puppeteer.connect({
      browserWSEndpoint: wsChromeEndpointurl
    })

    this.page = await this.browser.newPage()
    callback.bind(this)()
  }

  async search (query) {
    await this.page.goto(`https://df.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios?q=${query}`, { waitUntil: 'domcontentloaded' })
  }
}
// 
module.exports = Bot