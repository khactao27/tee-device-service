const {ethers} = require("ethers");
module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')

    const { otpRepo } = container.resolve('repo')
    const {
        schemaValidator,
        schemas: {
            Otp
        }
    } = container.resolve('models')
    const { httpCode, serverHelper } = container.resolve('config')
    const { provider } = container.resolve('ethers');

    const sendOtp = async (req, res) => {
        try {

            return res.status(httpCode.CREATED).json({ keyConfirm: 111223 })
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ ok: false, msg: 'Something went wrong!' })
        }
    }

    const validateOtp = async (req, res) => {
        try {
            const { keyConfirm } = req.body
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ ok: false, msg: 'Something went wrong!' })
        }
    }

    return {
        sendOtp,
        validateOtp
    }
}