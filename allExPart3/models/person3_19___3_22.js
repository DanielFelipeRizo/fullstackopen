const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'there must be a minimum of 3 fields for the field name']
  },
  number: {
    type: String,
    validate: {
      validator: (v) => /^(\d{2,3})-\d+$/.test(v) && v.replace('-', '').length >= 8,
      message: props => `${props.value} is not a valid number! It should be 2 or 3 digits followed by 4 or 5 digits, totaling at least 8 digits.`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)
module.exports = Person
