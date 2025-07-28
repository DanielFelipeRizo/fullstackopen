import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Author'
    }
  ],
})

export default model('User', userSchema)