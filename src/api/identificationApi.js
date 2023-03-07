module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { identificationController } = container.resolve('controller')
    const { basePath } = serverSettings

    app.post(`${basePath}/identifications/register`, identificationController.register)
    app.post(`${basePath}/identifications/login`, identificationController.login)
    app.get(`${basePath}/identification/profile`, identificationController.getProfile)
    // app.put(`${basePath}/identifications/default-claims`, identifierController.updateDefaultClaim)
    // app.post(`${basePath}/identifications/claims`, identifierController.upsertClaim)
    // app.delete(`${basePath}/identifications/claims`, identifierController.deleteClaim)
}