module.exports = (container) => {

  const notificationController = require('./notificationController')(container)
  const etherController = require('./etherController')(container)
  const identificationController = require('./identificationController')(container)
  const walletController = require('./walletController')(container)
  const applicationController = require('./applicationController')(container)
  const otpController = require('./otpController')(container)

  return {
    notificationController,
    identificationController,
    etherController,
    walletController,
    applicationController,
    otpController
  }
}
