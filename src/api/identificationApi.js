module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { identifierController } = container.resolve('controller')
    const { basePath } = serverSettings

    
}