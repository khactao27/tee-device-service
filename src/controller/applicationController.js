module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')

    const {
        schemaValidator,
        schemas: {
            Campaign
        }
    } = container.resolve('models')
    const { httpCode, serverHelper } = container.resolve('config')

    // Application Integration.

    const register = async (req, res) => {
        try {

        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    const getInformation = async (req, res) => {
        try {

        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    const update = async (req, res) => {
        try {
            const { publicKey } = req.body

        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    const unRegister = async (req, res) => {
        try {
            const { applicationId } = req.query
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    return {
        register,
        getInformation,
        update,
        unRegister
    }
}