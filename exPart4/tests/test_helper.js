const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
