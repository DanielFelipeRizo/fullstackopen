const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title:
  {
    type: String,
    required: true
  },
  author:
  {
    type: String,
  },
  url:
  {
    type: String,
    required: true
  },
  likes:
  {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: {
    type: [{
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: {
        type: String,
        required: true
      }
    }],
    default: []
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
