import React, { useState } from "react";
import blogService from '../services/blogs'

const BlogForm = ({ setNotificationMessage, blogs, setBlogs }) => {

    const [blog, setBlog] = useState({ title: '', author: '', url: '', likes: 0, user: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBlog({
            ...blog,
            [name]: value
        })
    }

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        try {
            const responseCreateBlog = await blogService.create(blog)
            console.log('responseCreateBlog');
            console.log(responseCreateBlog);

            if (responseCreateBlog) {
                setNotificationMessage({ msj: 'creation success', type: 'success' })
                setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)

                setBlogs(blogs.concat(responseCreateBlog))
                setBlog({ title: '', author: '', url: '', likes: 0, user: '' })
            }
        } catch (error) {
            console.log('error:', error);
            setNotificationMessage({ msj: 'creation error', type: 'error' })
            setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
        }
    }

    return (
        <div>
            <h2>add blogs</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    title: &nbsp;
                    <input
                        type="text"
                        value={blog.title}
                        name="title"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    author: &nbsp;
                    <input
                        type="text"
                        value={blog.author}
                        name="author"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    url: &nbsp;
                    <input
                        type="text"
                        value={blog.url}
                        name="url"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    likes: &nbsp;
                    <input
                        type="number"
                        value={blog.likes}
                        name="likes"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default BlogForm