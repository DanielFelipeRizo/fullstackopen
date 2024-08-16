const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    const total = blogs.reduce((sum, item) => sum + item.likes, 0)
    if (typeof total !== 'number' || total < 0) return 0
    return total
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) return null
    
    const maxLikes = blogs.reduce((max, current) =>
        current.likes > max ? current.likes : max, blogs[0].likes)

    const objMoreLikes = blogs.find(b => b.likes === maxLikes)
    const {title, author, likes} = objMoreLikes
    return {title, author, likes}
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const countAuthors = _.countBy(blogs, 'author')
    const popularAuthor = _.maxBy(Object.entries(countAuthors), ([, value]) => value)
    return {author: popularAuthor[0], blogs: popularAuthor[1]}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
