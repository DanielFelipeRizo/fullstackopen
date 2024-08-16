const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d1767",
        title: "Daniel",
        author: "Daniel",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

describe('total likes', () => {

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 50)
    })

    test('array empty', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })
    test('no number or negative number', () => {
        const result = listHelper.totalLikes([{ likes: [5] }])
        console.log(result);

        assert.strictEqual(result, 0)
    })
})

describe('favorite Blog', () => {

    test('favoriteBlog returns null for empty list', () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, null)
    })

    test('objet more likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        const expected =
        {
            title: "Daniel",
            author: "Daniel",
            likes: 12
        }
        assert.deepStrictEqual(result, expected)
    })

    test('equal objet more likes', () => {
        const result = listHelper.favoriteBlog(blogs)

        const expected =
        {
            title: "Daniel",
            author: "Daniel",
            likes: 12
        }
        assert.deepStrictEqual(result, expected)
    })
})

describe('author most blogs', () => {

    test('empty list', () => {
        const result = listHelper.mostBlogs([])
        assert.strictEqual(result, null)
    })

    test('one object', () => {
        const result = listHelper.mostBlogs([blogs[0]])
        const expected =
        {
            author: "Michael Chan",
            blogs: 1
        }
        assert.deepStrictEqual(result, expected)
    })

    test('author most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        const expected =
        {
            author: 'Robert C. Martin',
            blogs: 3
        }
        assert.deepStrictEqual(result, expected)
    })
})
