module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { walletController } = container.resolve('controller')
    const { basePath } = serverSettings

    app.get(`${basePath}/wallets`, walletController.getWallets)
    app.post(`${basePath}/wallets`, walletController.createWallet)
    app.put(`${basePath}/wallets`, walletController.updateWallet)
}