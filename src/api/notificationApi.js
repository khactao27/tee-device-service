module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { notificationController } = container.resolve('controller')
    const { basePath } = serverSettings
}