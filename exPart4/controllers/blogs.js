const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) response.json(blog)
  else response.status(404).json({ error: "resource not found" })

})

blogsRouter.post('/', async (request, response) => {
  const currentBlog = request.body
  currentBlog.likes = currentBlog.likes || 0
  const blog = new Blog(currentBlog)

  const savedBlog = await blog.save()
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

  const currentBlog = await Blog.findById(request.params.id)
  if (currentBlog) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    
    response.json(updatedBlog)
  } else {
    response.status(404).json({ error: "resource not found" })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const currentBlog = await Blog.findById(request.params.id)
  if (currentBlog) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(404).json({ error: "resource not found" })
  }
})

module.exports = blogsRouter