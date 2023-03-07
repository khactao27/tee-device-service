module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')

    const { walletRepo } = container.resolve('repo')
    const {
        schemaValidator,
        schemas: {
            Wallet
        }
    } = container.resolve('models')
    const { httpCode, serverHelper } = container.resolve('config')

    const getWallets = async (req, res) => {
        try {
            let {
                page,
                perPage,
                sort,
                ids
            } = req.query
            page = +page || 1
            perPage = +perPage || 10
            sort = +sort === 0 ? { createdAt: 1 } : +sort || { createdAt: -1 }
            const skip = (page - 1) * perPage
            const search = { ...req.query }
            const pipe = {}

            if (ids) {
                if (ids.constructor === Array) {
                    pipe._id = { $in: ids }
                } else {
                    pipe._id = { $in: ids.split(',') }
                }
            }
            delete search.ids
            delete search.page
            delete search.perPage
            delete search.sort

            Object.keys(search).forEach(key => {
                const value = search[key]
                const pathType = (Wallet.schema.path(key) || {}).instance || ''
                if (pathType.toLowerCase() === 'objectid') {
                    pipe[key] = value ? ObjectId(value) : { $exists: false }
                } else if (pathType === 'Number') {
                    pipe[key] = +value ? +value : 0
                } else if (pathType === 'String' && value.constructor === String) {
                    pipe[key] = new RegExp(value.replace(/\\/g, '\\\\'), 'gi')
                } else {
                    pipe[key] = value
                }
            })
            const data = await walletRepo.getWallet(pipe, perPage, skip, sort)
            const total = await walletRepo.getCount(pipe)
            return res.status(httpCode.SUCCESS).json({
                data,
                page,
                perPage,
                sort,
                total
            })
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    const createWallet = async (req, res) => {
        try {
            const wallet = req.body
            if (wallet) {
                const { error, value } = await schemaValidator(wallet, 'Wallet')
                if (error) {
                    logger.e(error)
                    return res.status(httpCode.BAD_REQUEST).json({ msg: error.message })
                }
                await walletRepo.addWallet(value)
                return res.status(httpCode.CREATED).json({ oke: true })
            }
            return res.status(httpCode.BAD_REQUEST).json({ oke: false, msg: 'Thông tin ví không hợp lệ.' })
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    const updateWallet = async (req, res) => {
        try {
            const { owners, address } = req.body
            // await walletRepo.updateWallet()
            return res.status(httpCode.SUCCESS).json({ oke: true })
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!'})
        }
    }

    return {
        getWallets,
        createWallet,
        updateWallet
    }
}