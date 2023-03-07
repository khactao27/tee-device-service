module.exports = container => {
    const { schemas } = container.resolve('models')
    const { Wallet } = schemas
    const addWallet = (data) => {
        const n = new Wallet(data)
        return n.save()
    }
    const getWalletById = (id) => {
        return Wallet.findById(id)
    }
    const deleteWallet = (id) => {
        return Wallet.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const updateWallet = (id, n) => {
        return Wallet.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return Wallet.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return Wallet.countDocuments(pipe)
    }
    const getWalletAgg = (pipe) => {
        return Wallet.aggregate(pipe)
    }
    const getWallet = (pipe, limit, skip, sort) => {
        return Wallet.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getWalletNoPaging = (pipe) => {
        return Wallet.find(pipe).populate()
    }
    const removeWallet = (pipe) => {
        return Wallet.deleteMany(pipe)
    }
    return {
        getWalletNoPaging,
        removeWallet,
        addWallet,
        getWalletAgg,
        getWalletById,
        deleteWallet,
        updateWallet,
        checkIdExist,
        getCount,
        getWallet
    }
}
