import 'colors'
import express from 'express'
import { createClient } from 'redis'
import fetch from 'node-fetch' // Ensure node-fetch is imported

const PORT = 5000
const REDIS_PORT = 6379

const client = createClient({
  url: `redis://localhost:${REDIS_PORT}`,
})

client.on('error', (err) => {
  console.error('Redis client error:', err)
})

await client.connect().catch(console.error)

const app = express()

function setRes(username, repos) {
  return `${username} has ${repos} GitHub repos`
}

async function cache(req, res, next) {
  const { username } = req.params
  try {
    const data = await client.get(username)
    if (data !== null) res.send(setRes(username, data))
    else next()
  } catch (err) {
    console.error('Redis get error:', err)
    res.status(500).send('Internal Server Error')
  }
}

async function getRepos(req, res) {
  try {
    console.log('Fetching data...')
    const { username } = req.params

    const response = await fetch(`https://api.github.com/users/${username}`)
    console.log('Getting the response...')

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`)
    }

    const data = await response.json()
    console.log('Parsing the response to JSON...')

    const repos = data.public_repos

    await client.setEx(username, 3600, repos.toString()) // Convert repos to string
    console.log('Setting the cache...')

    res.send(setRes(username, repos))
  } catch (error) {
    console.error('Error fetching repos:', error)
    res.status(500).send('Internal Server Error')
  }
}

app.get('/', (req, res) => {
  res.send('Hi there')
})

app.get('/repos/:username', cache, getRepos)

app.listen(PORT, () =>
  console.log(`App is listening on port ${PORT} http://localhost:${PORT}`.blue)
)
