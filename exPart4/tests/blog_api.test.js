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
    await User.insertMany(helper.initialUsers)
    await Blog.insertMany(helper.initialBlogs)

})

let cachedToken = null;

const testToken = async () => {
    if (cachedToken) {
        return cachedToken;
    }

    const userLogin = {
        "username": "dfr11",
        "password": "12345"
    }

    const loginResponse = await api.post('/api/login')
        .send(userLogin)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    cachedToken = loginResponse.body.token;

    return cachedToken;
}


test('verify property id', async () => {
    const response = await api.get('/api/blogs')
        .expect('Content-Type', /application\/json/)
        .expect(200)

    response.body.forEach(blog => {
        assert.strictEqual(blog.hasOwnProperty('id'), true)
    })
})

test('failure when trying to add a blog without token', async () => {
    const newBlog = {
        "title": "post desde test",
        "author": "dfr11",
        "url": "www.post.com",
        "likes": 3,
        "user": "66d3cd67e83d52e7e6959ce2",
        "_id": "66d3bafc77e8503cc69ae394"
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(401).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

describe('validate get', () => {

    test('get users correctly', async () => {
        const response = await api.get('/api/blogs')
            .expect('Content-Type', /application\/json/)
            .expect(200)

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blogs are returned as json and three blogs', async () => {
        const response = await api.get('/api/blogs')
            .expect('Content-Type', /application\/json/)
            .expect(200)

        assert.strictEqual(response.body.length, 3)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('validate post', () => {
    
    test('a valid blog can be added', async () => {

        const newBlog = {
            title: "post desde test",
            author: "dfr11",
            url: "www.post.com",
            likes: 3,
        }

        const token = await testToken()

        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
        const titles = response.body.map(blog => blog.title)
        assert.strictEqual(titles.includes(newBlog.title), true)
    })


    test('validate default like property equal to zero', async () => {
        const newBlog = {
            "title": "post desde test",
            "author": "dfr",
            "url": "www.post.com"
        }

        const token = await testToken();

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
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

        const token = await testToken();

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400).expect('Content-Type', /application\/json/)

        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog1)
            .expect(400).expect('Content-Type', /application\/json/)

        const allBlogs = await api.get('/api/blogs')
        assert.strictEqual(allBlogs.body.length, helper.initialBlogs.length)
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

    test('failure with statuscode 404 if the blog to be updating does not exist', async () => {
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

        const token = await testToken();

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const urls = blogsAtEnd.map(b => b.url)
        assert(!urls.includes(blogToDelete.url))
    })

    test('failure with statuscode 404 if the blog to be deleted does not exist', async () => {
        const nonExistingId = await helper.nonExistingId()

        const token = await testToken();

        await api
            .delete(`/api/blogs/${nonExistingId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

})


after(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    await mongoose.connection.close()
})
