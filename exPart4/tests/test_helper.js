const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "titulo",
    "author": "dfr",
    "url": "www.s.com",
    "likes": 4
  },
  {
    "title": "titulo1",
    "author": "dfr",
    "url": "www.s1.com",
    "likes": 1
  }
]

const initialUsers = [
  {
    "username": "dfr",
    "name": "Daniel",
    "blogs": []
  },
  {
    "username": "prueba 1",
    "name": "prueba 1",
    "blogs": []
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'r@mail.com' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
