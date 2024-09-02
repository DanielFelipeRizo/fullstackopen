const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    "_id": "66d3cd67e83d52e7e6959ce2",
    "username": "dfr11",
    "name": "Daniel",
    "passwordHash": "$2b$10$lfUPrp.9.TW8tZuETLeCkeeTPhE7UQm4TCVx8AV3MR49qylFfhgO2",
    "blogs": ["66d3bafc77e8503cc69ae392", "66d3c57377e8503cc69ae39a"]
  },
  {
    "_id": "66d3cd67e83d52e7e6959ce3",
    "username": "admin",
    "name": "admin D",
    "passwordHash": "$2b$10$lfUPrp.9.TW8tZuETLeCkeeTPhE7UQm4TCVx8AV3MR49qylFfhgO2",
    "blogs": ["66d3c5fc77e8503cc69ae3a3"]
  }
]

const initialBlogs = [
  {
    "title": "titulo",
    "author": "dfr11",
    "url": "www.titulo.com",
    "likes": "55",
    "user": "66d3cd67e83d52e7e6959ce2",
    "_id": "66d3bafc77e8503cc69ae392"
  },
  {
    "title": "otra",
    "author": "dfr11",
    "url": "www.otra.com",
    "likes": "31",
    "user": "66d3cd67e83d52e7e6959ce2",
    "_id": "66d3c57377e8503cc69ae39a"
  },
  {
    "title": "admin test",
    "author": "admin test",
    "url": "www.admintest.com",
    "likes": "30",
    "user": "66d3cd67e83d52e7e6959ce3",
    "_id": "66d3c5fc77e8503cc69ae3a3"
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'r@mail.com' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  nonExistingId, blogsInDb, usersInDb, initialUsers, initialBlogs
}
