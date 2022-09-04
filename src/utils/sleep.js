async function sleep (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

module.exports = sleep