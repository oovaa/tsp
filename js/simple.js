// app.js

import { feathers } from '@feathersjs/feathers'
import { koa, rest, bodyParser, errorHandler } from '@feathersjs/koa'
import winston from 'winston'
import mongoose from 'mongoose'
import { logger } from './src/logger'

mongoose.connect('mongodb://localhost:27017/mymessages', { useNewUrlParser: true, useUnifiedTopology: true })

const app = koa(feathers())

// Middleware
app.use(errorHandler())
app.use(bodyParser())

// Set up REST transport
app.configure(rest())

const MessageSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', MessageSchema)

app.use('msgs', {
  async find(params) {
    logger.info('Finding all messages')
    return await Message.find()
  },
  async get(id, params) {
    logger.info(`Getting message with id ${id}`)
    return await Message.findById(id)
  },
  async create(data, params) {
    const message = new Message({
      text: data.text,
      createdAt: new Date().getTime()
    })
    await message.save()
    logger.info(`Created message with id ${message.id}`)
    return message
  },
  async remove(id, params) {
    const message = await Message.findByIdAndDelete(id)
    if (!message) throw new Error(`Message with id ${id} not found`)
    logger.info('Deleted message', message)
    return message
  }
})

// Start the server
const port = 3030
await app.listen(port)
console.log(`Feathers server listening on http://localhost:${port}`)
