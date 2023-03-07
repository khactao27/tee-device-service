module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { applicationController } = container.resolve('controller')
    const { basePath } = serverSettings

    // app.post(`${basePath}/applications/register`, applicationController.register)
    // app.put(`${basePath}/applications`, applicationController.updatePubKey)
    // app.get(`${basePath}/applications`, applicationController.get)
    // app.delete(`${basePath}/applications`, applicationController.delete)
}