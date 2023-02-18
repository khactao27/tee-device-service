module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { etherController } = container.resolve('controller')
    const { basePath } = serverSettings

    app.get(`${basePath}/ethers/balance`, etherController.getBalance)
}