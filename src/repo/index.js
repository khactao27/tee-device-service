const repo = (container) => {
  const campaignRepo = require('./campaignRepo')(container)
  return { campaignRepo }
}
const connect = (container) => {
  const dbPool = container.resolve('db')
  if (!dbPool) throw new Error('Connect DB failed')
  return repo(container)
}

module.exports = { connect }
