module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { applicationController } = container.resolve('controller')
    const { basePath } = serverSettings


}