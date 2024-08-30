const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) response.json(blog)
  else response.status(404).json({ error: "resource not found" })

})

blogsRouter.post('/', async (request, response) => {
  const bodyBlog = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog(
    {
      title: bodyBlog.title,
      author: bodyBlog.author,
      url: bodyBlog.url,
      likes: bodyBlog.likes || 0,
      user: user.id
    })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const bodyBlog = await Blog.findById(request.params.id)
  if (bodyBlog) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(updatedBlog)
  } else {
    response.status(404).json({ error: "resource not found" })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const bodyBlog = await Blog.findById(request.params.id)
  if (bodyBlog) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(404).json({ error: "resource not found" })
  }
})

module.exports = blogsRouter