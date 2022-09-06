const { spawn } = require('child_process');
const fetch = require('axios')


const openChrome = () => new Promise(res => {
  spawn('google-chrome', ['--remote-debugging-port=9222'])
  res(true)
})

const runFetch = () => {
  fetch(`http://127.0.0.1:9222/json/version`).then(async (res) => {
    console.log(res.data.webSocketDebuggerUrl)
    // this.browser = await puppeteer.connect({
    //   browserWSEndpoint: res.data.webSocketDebuggerUrl
    // })

    // console.log(this.browser)

    // this.page = await this.browser.newPage()
    // callback.bind(this)()
  }).catch(() => console.log('errou'))
}

const run = async () => {
  openChrome().then(_res => {
    setTimeout(runFetch, 400)
  })
  // console.log({ res });
}

run()

// child.stdout.on('data', data => {
//   console.log(`stdout:\n${data}`);
// });

// child.stderr.on('data', data => {
//   console.error(`stderr: ${data}`);
// });

// child.on('error', (error) => {
//   console.error(`error: ${error.message}`);
// });

// child.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });