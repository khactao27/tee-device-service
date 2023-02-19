module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { notificationController } = container.resolve('controller')
    const { basePath } = serverSettings

    app.post(`${basePath}/notifications`, notificationController.register)
    app.delete(`${basePath}/notifications/un-register`, notificationController.unregister)
    app.put(`${basePath}/notifications`, notificationController.update)
    app.get(`${basePath}/notifications`, notificationController.getNotification)
}