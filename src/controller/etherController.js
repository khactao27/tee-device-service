const {ethers} = require('ethers');

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

    const { provider } = container.resolve('ethers');

    const getBalance = async (req, res) => {
        try {
            let {
                address
            } = req.query
            if (!ethers.utils.isAddress(address)) {
                return res.status(httpCode.BAD_REQUEST).json({ ok: false, msg: 'Address form invalid!' })
            }
            let balance = await provider.getBalance(address)
            return res.status(httpCode.SUCCESS).json({
                balances: ethers.utils.formatEther(balance)
            })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERR).json({ ok: false, msg: 'Something went wrong!'})
        }
    }

    return {
        getBalance
    }
}