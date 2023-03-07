module.exports = container => {
    const { schemas } = container.resolve('models')
    const { Identification } = schemas
    const addIdentification = (data) => {
        const n = new Identification(data)
        return n.save()
    }
    const getIdentificationById = (id) => {
        return Identification.findById(id)
    }
    const deleteIdentification = (id) => {
        return Identification.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const updateIdentification = (id, n) => {
        return Identification.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return Identification.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return Identification.countDocuments(pipe)
    }
    const getIdentificationAgg = (pipe) => {
        return Identification.aggregate(pipe)
    }
    const getIdentification = (pipe, limit, skip, sort) => {
        return Identification.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getIdentificationNoPaging = (pipe) => {
        return Identification.find(pipe).populate()
    }
    const removeIdentification = (pipe) => {
        return Identification.deleteMany(pipe)
    }
    return {
        getIdentificationNoPaging,
        removeIdentification,
        addIdentification,
        getIdentificationAgg,
        getIdentificationById,
        deleteIdentification,
        updateIdentification,
        checkIdExist,
        getCount,
        getIdentification
    }
}
