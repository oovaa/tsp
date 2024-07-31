import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('users list')
})

router.get('/new', (req, res) => {
  res.send('user new form')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  res.send('User get ' + id)
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  res.send('User put ' + id)
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  res.send('User delete ' + id)
})

router.param('id', (req, res, next, id) => {
  console.log(id)
  next()
})

export default router
