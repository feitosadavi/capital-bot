const puppeteer = require('puppeteer');
const fs = require('fs');

class CookieManager {
  async saveCookies (page) {
    const cookies = await page.cookies();
    const cookieJson = JSON.stringify(cookies, null, 2);
    await fs.writeFileSync('cookies.json', cookieJson);
  }

  async loadCookies (page) {
    if (fs.existsSync('cookies.json')) {
      fs.readFile('cookies.json', async (error, cookieJson) => {
        if (error) throw error
        const cookies = JSON.parse(cookieJson);
        await page.setCookie(...cookies);
      });
    }
  }
}

module.exports = CookieManager