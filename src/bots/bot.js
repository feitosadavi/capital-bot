'use strict'

const fetch = require('axios')
const puppeteer = require('puppeteer-core')
const { spawn } = require('child_process');
// const wsChromeEndpointurl = 'ws://127.0.0.1:9222/devtools/browser/32914592-9865-42c6-9102-0b5e74838ef5'

// const PORT = Math.floor(1000 + Math.random() * 9000)
const PORT = 9222

const openChrome = () => new Promise(res => {
  spawn('google-chrome', [`--remote-debugging-port=${PORT}`])
  res(true)
})

class Bot {
  isBusy = false

  async init (callback) {
    console.log({ PORT })
    fetch(`http://127.0.0.1:${PORT}/json/version`).then(async (res) => {
      // console.log(res.data.webSocketDebuggerUrl)
      this.browser = await puppeteer.connect({
        browserWSEndpoint: res.data.webSocketDebuggerUrl
      })

      this.page = await this.browser.newPage()
      callback.bind(this)()
    }).catch((e) => console.log('errou', e))
    // openChrome().then(_res => {
    //   setTimeout(() => {

    //   }, 500)
    // })
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