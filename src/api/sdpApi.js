module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { sdpController } = container.resolve('controller')
    const { basePath } = serverSettings
    const { verifyInternalToken } = container.resolve('middleware')
    // SDP is a service for controller GET request. Requests relative to read data
    app.get(`${basePath}/sdp/campaign`, verifyInternalToken, sdpController.getCampaign)
    app.get(`${basePath}/sdp/campaign/:id`, verifyInternalToken, sdpController.getCampaignById)
}
