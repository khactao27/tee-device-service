module.exports = (container) => {
  const campaignController = require('./campaignController')(container)
  const cdcController = require('./cdcController')(container)
  const sdpController = require('./sdpController')(container)
  return { campaignController, sdpController, cdcController }
}
