module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')

    const { walletRepo } = container.resolve('repo')
    const {
        schemaValidator,
        schemas: {
            Identification
        }
    } = container.resolve('models')
    const { httpCode, serverHelper } = container.resolve('config')
    const { provider } = container.resolve('ethers');

    const register = async (req, res) => {
        try {
            return res.status(httpCode.CREATED).json({ oke: true })
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
        }
    }

    const login = async (req, res) => {
        try {

        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
        }
    }

    const getProfile = async (req, res) => {
        try {
            const { address } = req.query
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
        }
    }

    const updateProfile = async (req, res) => {
        try {

        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
        }
    }


    return {
        register,
        login,
        getProfile,
        updateProfile
    }
}