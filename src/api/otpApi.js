module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { otpController } = container.resolve('controller')
    const { basePath } = serverSettings

    app.post(`${basePath}/otp`, otpController.sendOtp)
    app.post(`${basePath}/opt/validate`, otpController.validateOtp)
}