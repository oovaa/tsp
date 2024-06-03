import mongoose from 'mongoose'
import { User } from './user.js'

mongoose.connect('mongodb://localhost:27017/mongoose')

async function run() {
  try {
    const u = await User.findOne({ name: 'tata' })
    await u.save()
    console.log(u)
  } catch (e) {
    console.log(e.message)
  } finally {
    mongoose.connection.close()
  }
}
run()
