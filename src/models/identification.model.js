module.exports = (joi, mongoose, {
    joi2MongoSchema,
    schemas
}) => {
    const ObjectId = mongoose.Types.ObjectId
    const identificationJoi = joi.object({
        owner: joi.string().required(),
        contract: joi.string().required(),
        claims: joi.array().items(joi.string().required()).min(0)
    })
    const identificationSchema = joi2MongoSchema(identificationJoi, {
    }, {
        createAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    identificationSchema.statics.validateObj = (obj, config = {}) => {
        return identificationJoi.validate(obj, config)
    }
    identificationSchema.statics.validateDocument = (obj, config = {
        allowUnknown: true,
        stripUnknown: true
    }) => {
        return identificationJoi.validate(obj, config)
    }
    const identificationModel = mongoose.model('Identification', identificationSchema)
    identificationModel.syncIndexes()
    return identificationModel
}