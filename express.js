import express from 'express'
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.status(200).json({ message: 'success' })
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})

app.use('/stat', express.static('static'))

app.listen(port, () =>
  console.log(`app is on ${port} http://localhost:${port}`)
)
