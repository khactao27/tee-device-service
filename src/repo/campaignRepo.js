module.exports = container => {
    const { schemas } = container.resolve('models')
    const { Campaign } = schemas
    const addCampaign = (data) => {
        const n = new Campaign(data)
        return n.save()
    }
    const getCampaignById = (id) => {
        return Campaign.findById(id)
    }
    const deleteCampaign = (id) => {
        return Campaign.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const updateCampaign = (id, n) => {
        return Campaign.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return Campaign.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return Campaign.countDocuments(pipe)
    }
    const getCampaignAgg = (pipe) => {
        return Campaign.aggregate(pipe)
    }
    const getCampaign = (pipe, limit, skip, sort) => {
        return Campaign.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getCampaignNoPaging = (pipe) => {
        return Campaign.find(pipe)
    }
    const removeCampaign = (pipe) => {
        return Campaign.deleteMany(pipe)
    }
    return {
        getCampaignNoPaging,
        removeCampaign,
        addCampaign,
        getCampaignAgg,
        getCampaignById,
        deleteCampaign,
        updateCampaign,
        checkIdExist,
        getCount,
        getCampaign
    }
}
