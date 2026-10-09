const redis = require('redis')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })

  client.on('error', (err) => console.log('Redis Client Error', err))

  client.connect().then(() => {
    console.log('Connected to Redis')
  })

  getAsync = (...args) => client.get(...args)
  setAsync = (...args) => client.set(...args)
}

module.exports = {
  getAsync,
  setAsync,
}
