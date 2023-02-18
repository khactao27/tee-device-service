module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { cdcController } = container.resolve('controller')
    const { basePath } = serverSettings
    const { verifyInternalToken } = container.resolve('middleware')
    // CDC is a service for controller PUT, POST, DELETE, PATCH request. Requests relative to modify data
    app.put(`${basePath}/cdc/campaign/:id`, verifyInternalToken, cdcController.updateCampaign)
    app.delete(`${basePath}/cdc/campaign/:id`, verifyInternalToken, cdcController.deleteCampaign)
    app.post(`${basePath}/cdc/campaign`, verifyInternalToken, cdcController.addCampaign)
}
