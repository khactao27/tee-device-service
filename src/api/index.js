module.exports = (app, container) => {
  const { verifyCMSToken } = container.resolve('middleware')
  require('./cdcApi')(app, container)
  require('./sdpApi')(app, container)
  app.use(verifyCMSToken)
  require('./campaignApi')(app, container)
}
