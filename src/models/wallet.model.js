module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
    const ObjectId = mongoose.Types.ObjectId
    const walletJoi = joi.object({
        name: joi.string().required(),
        contractAddress: joi.string().required(),
        owners: joi.array().items(joi.string()).required(),
    })
    const walletSchema = joi2MongoSchema(walletJoi, {

    }, {
        createdAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    walletSchema.statics.validateObj = (obj, config = {}) => {
        return walletJoi.validate(obj, config)
    }
    walletSchema.statics.validateDocument = (obj, config = {
        allowUnknown: true,
        stripUnknown: true
    }) => {
        return walletJoi.validate(obj, config)
    }
    const walletModel = mongoose.model('Wallet', walletSchema)
    walletModel.syncIndexes()
    return walletModel
}