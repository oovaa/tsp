import 'colors'
import express from 'express'
import redis from 'redis'

const PORT = 5000
const REDIS_PORT = 6379

const client = redis.createClient(REDIS_PORT)

client.on('error', (err) => {
  console.error('Redis client error:', err)
})

client.connect().catch(console.error)

const app = express()

function setRes(username, repos) {
  return `${username} has ${repos} gh repos`
}

function cache(req, res, next) {
  const { username } = req.params
  client.get(username, (err, data) => {
    if (err) throw err

    if (data !== null) res.send(setRes(username, data))
    else next()
  })
}

async function getRepos(req, res, next) {
  try {
    console.log('fetching data...')
    const { username } = req.params

    const response = await fetch(`https://api.github.com/users/${username}`)
    console.log('getting the response ...')

    const data = await response.json()

    console.log('getting the response to json ...')

    const repos = data.public_repos

    await client.setEx(username, 3600, repos.toString()) // Convert repos to string
    console.log('setting the cache ...')

    res.send(setRes(username, repos))
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
}

app.get('/repos/:username', cache, getRepos)

app.listen(PORT, () =>
  console.log(`App is listing on port ${PORT} http://localhost:${PORT}`.blue)
)
