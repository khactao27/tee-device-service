module.exports = (joi, mongoose, {
    joi2MongoSchema,
    schemas
}) => {
    const ObjectId = mongoose.Types.ObjectId
    const applicationJoi = joi.object({
        integrationStatus: joi.boolean().required(),
        appId: joi.string().required(),
        signer: joi.string().required(),
        name: joi.string().required(),
    })
    const applicationSchema = joi2MongoSchema(applicationJoi, {
        code: {
            type: String,
            unique: true,
            uppercase: true
        },
        promote: {
            type: ObjectId,
            ref: 'Promotion'
        }
    }, {
        createAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    applicationSchema.statics.validateObj = (obj, config = {}) => {
        return applicationJoi.validate(obj, config)
    }
    applicationSchema.statics.validateDocument = (obj, config = {
        allowUnknown: true,
        stripUnknown: true
    }) => {
        return applicationJoi.validate(obj, config)
    }
    const applicationModel = mongoose.model('Application', applicationSchema)
    applicationModel.syncIndexes()
    return applicationModel
}