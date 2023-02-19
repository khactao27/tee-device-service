const {ethers} = require("ethers");
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

    const NOTIFICATION_CONTRACT_ADDR = '0x8E6ac0390fDEe3563b4d9D1a0d9D1C4bfECD36F5'
    const NOTIFICATION_CONTRACT = [
        'function register(string,string,string) external',
        'function unregister(string) external',
        'function update(string,string,string) external',
        'function get(string) external view returns (string, string, address)'
    ]

    const update = async (req, res) => {
        try {
            let { email, deviceType, deviceToken, privateKey } = req.body
            let signer = new ethers.Wallet(privateKey, provider)
            let contract = new ethers.Contract(NOTIFICATION_CONTRACT_ADDR, NOTIFICATION_CONTRACT, signer)
            let result = await contract.update(email, deviceType, deviceToken)
            return res.status(httpCode.SUCCESS).json(result)
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    const getNotification = async (req, res) => {
        try {
            let { email } = req.query
            const contract = new ethers.Contract(NOTIFICATION_CONTRACT_ADDR, NOTIFICATION_CONTRACT, provider)
            let result = await contract.get(email);
            return res.status(httpCode.SUCCESS).json(result)
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    const register = async (req, res) => {
        try {
            let { deviceType, deviceToken, email, privateKey } = req.body
            let signer = new ethers.Wallet(privateKey, provider)
            let contract = new ethers.Contract(NOTIFICATION_CONTRACT_ADDR, NOTIFICATION_CONTRACT, signer);
            let result = await contract.register(email, deviceType, deviceToken);
            return res.status(httpCode.CREATED).json(result)
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    const unregister = async (req, res) => {
        try {
            let { email, privateKey } = req.body
            let signer = new ethers.Wallet(privateKey, provider)
            let contract = new ethers.Contract(NOTIFICATION_CONTRACT_ADDR, NOTIFICATION_CONTRACT, signer)
            let result = await contract.unregister(email)
            return res.status(httpCode.SUCCESS).json(result)
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    return {
        update,
        getNotification,
        register,
        unregister
    }
}