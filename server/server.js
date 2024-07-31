import express from 'express'
import router from './routes/users.js'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('here')
  res.send('Hello World!')
})

app.use('/users', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
