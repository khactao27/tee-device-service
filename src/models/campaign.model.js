module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
    const campaignJoi = joi.object({
    })
    const campaignSchema = joi2MongoSchema(campaignJoi, {
        ma: {
            unique: true,
            uppercase: true
        }
    }, {
        createdAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    campaignSchema.statics.validateObj = (obj, config = {}) => {
        return campaignJoi.validate(obj, config)
    }
    campaignSchema.statics.validateDocument = (obj, config = {
        allowUnknown: true,
        stripUnknown: true
    }) => {
        return campaignJoi.validate(obj, config)
    }
    const campaignModel = mongoose.model('Campaign', campaignSchema)
    campaignModel.syncIndexes()
    return campaignModel
}
