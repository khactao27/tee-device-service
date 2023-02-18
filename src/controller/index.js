module.exports = (container) => {
  const notificationController = require('./notificationController')(container)
  const etherController = require('./etherController')(container)
  const identificationController = require('./identificationController')(container)
  return { notificationController, identificationController, etherController }
}
