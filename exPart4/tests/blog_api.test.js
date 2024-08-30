const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.insertMany(helper.initialUsers)
})

test('verify property id', async () => {
    const response = await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)
        .expect(200)

    response.body.forEach(blog => {
        assert.strictEqual(blog.hasOwnProperty('id'), true)
    })
})

test('a valid blog can be added', async () => {
    const newBlog = {
        "title": "post desde test",
        "author": "dfr",
        "url": "www.post.com",
        "likes": 3
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

test('validate default like property equal to zero', async () => {
    const newBlog = {
        "title": "post desde test",
        "author": "dfr",
        "url": "www.post.com"
    }

    const response = await api.post('/api/blogs')
        .send(newBlog)
        .expect(201).expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)

    const allBlogs = await api.get('/api/blogs')
    assert.strictEqual(allBlogs.body.length, helper.initialBlogs.length + 1)
})

test('validate required properties', async () => {
    const newBlog =
    {
        "title": "test",
        "author": "test"
    }

    const newBlog1 =
    {
        "author": "test1",
        "url": "www.test.com",
        "likes": 22
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400).expect('Content-Type', /application\/json/)

    await api.post('/api/blogs')
        .send(newBlog1)
        .expect(400).expect('Content-Type', /application\/json/)

    const allBlogs = await api.get('/api/blogs')
    assert.strictEqual(allBlogs.body.length, helper.initialBlogs.length)
})

describe('validate get', () => {

    test('blogs are returned as json and two blogs', async () => {
        const response = await api.get('/api/blogs')
            .expect('Content-Type', /application\/json/)
            .expect(200)

        assert.strictEqual(response.body.length, 2)
    })
})

describe('updating a blog', () => {

    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const testBlog = {
            title: 'test',
            author: 'dfr',
            url: 'www.test.com',
            likes: 443
        }

        const blogUpdated = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(testBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

        const propertiesBlogRes = {
            title: blogUpdated.body.title,
            author: blogUpdated.body.author,
            url: blogUpdated.body.url,
            likes: blogUpdated.body.likes
        }

        assert.deepStrictEqual(testBlog, propertiesBlogRes)
    })

    test('failure with statuscode 404 if the blog to be deleted does not exist', async () => {
        const nonExistingId = await helper.nonExistingId()

        await api
            .put(`/api/blogs/${nonExistingId}`)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .put(`/api/blogs/${invalidId}`)
            .expect(400)
    })

})

describe('deletion of a blog', () => {

    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const urls = blogsAtEnd.map(b => b.url)
        assert(!urls.includes(blogToDelete.url))
    })

    test('failure with statuscode 404 if the blog to be deleted does not exist', async () => {
        const nonExistingId = await helper.nonExistingId()

        await api
            .delete(`/api/blogs/${nonExistingId}`)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})


after(async () => {
    await mongoose.connection.close()
})
