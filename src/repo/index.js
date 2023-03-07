const repo = (container) => {
  const applicationRepo = require('./applicationRepo')(container)
  const identificationRepo = require('./identificationRepo')(container)
  const notificationRepo = require('./notificationRepo')(container)
  const otpRepo = require('./otpRepo')(container)
  const walletRepo = require('./walletRepo')(container)

  return {
    applicationRepo,
    identificationRepo,
    notificationRepo,
    walletRepo,
    otpRepo
  }
}
const connect = (container) => {
  const dbPool = container.resolve('db')
  if (!dbPool) throw new Error('Connect DB failed')
  return repo(container)
}

module.exports = { connect }
