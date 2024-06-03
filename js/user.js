import mongoose from 'mongoose'

// Define the user schema with the correct spelling and structure
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String }, //required: true },
  created_at: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  updated_at: {
    type: Date,
    default: () => Date.now()
  },
  bestFriend: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hobbies: [String],
  address: {
    street: String,
    city: String
  }
})

userSchema.methods.hi = function () {
  console.log(`hi my name is ${this.name}`)
}

userSchema.statics.findByName = function (name) {
  // class level
  return this.find({ name: new RegExp(name, 'i') }).exec()
}

userSchema.query.byname = function (name) {
  // bind like where and .equals
  return this.where({ name: new RegExp(name, 'i') })
}

userSchema.virtual('namedEmail').get(function () {
  return `${this.name} <${this.email}> `
})

userSchema.pre('save', function (next) {
  this.updated_at = Date.now()
  next()
})

userSchema.post('save', function (doc, next) {
  console.log(`${doc.name} is updated`)
  next()
})

const User = mongoose.model('User', userSchema)

export { User }

// Optional: Automatically handle createdAt and updatedAt fields using timestamps
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: { type: String, required: true },
//   bestFriend: mongoose.Schema.Types.ObjectId,
//   hobbies: [String],
//   address: {
//     street: String,
//     city: String
//   }
// }, { timestamps: true });
