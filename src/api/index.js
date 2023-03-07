module.exports = (app, container) => {
  const { verifyCMSToken } = container.resolve('middleware')
  require('./etherApi')(app, container)
  require('./notificationApi')(app, container)
  // app.use(verifyCMSToken)
  require('./identificationApi')(app, container)
  require('./walletApi')(app, container)
  require('./authApi')(app, container)
  require('./otpApi')(app, container)
}
