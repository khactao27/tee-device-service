module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { campaignController } = container.resolve('controller')
    const { basePath } = serverSettings
    app.get(`${basePath}/campaign`, campaignController.getCampaign)
    app.get(`${basePath}/campaign/:id`, campaignController.getCampaignById)
    app.put(`${basePath}/campaign/:id`, campaignController.updateCampaign)
    app.delete(`${basePath}/campaign/:id`, campaignController.deleteCampaign)
    app.post(`${basePath}/campaign`, campaignController.addCampaign)
}
