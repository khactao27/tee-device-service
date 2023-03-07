module.exports = (joi, mongoose, {
    joi2MongoSchema,
    schemas
}) => {
    const ObjectId = mongoose.Types.ObjectId
    const notificationJoi = joi.object({
        seen: joi.boolean().default(false),
        receiver: joi.string().required(),
        content: joi.string().required(),
    })
    const notificationSchema = joi2MongoSchema(notificationJoi, {
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
    notificationSchema.statics.validateObj = (obj, config = {}) => {
        return notificationJoi.validate(obj, config)
    }
    notificationSchema.statics.validateDocument = (obj, config = {
        allowUnknown: true,
        stripUnknown: true
    }) => {
        return notificationJoi.validate(obj, config)
    }
    const notificationModel = mongoose.model('Notification', notificationSchema)
    notificationModel.syncIndexes()
    return notificationModel
}