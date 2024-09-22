import { useState, useImperativeHandle, forwardRef } from 'react'
import blogService from '../services/blogs'
import blogs from '../services/blogs'

const Blog = ({ blog, setNotificationMessage, blogs, setBlogs }) => {

  const [showDetails, setShowDetails] = useState(false)

  //estilos en linea
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const handleView = (title) => {
    console.log('click in', title)
    setShowDetails(!showDetails)
  }

  const handleUpdateLikesBlog = async () => {

    try {
      blog.likes = blog.likes + 1
      const responseUpdateBlog = await blogService.update(blog.id, blog)

      if (responseUpdateBlog.data) {
        setNotificationMessage({ msj: 'update like success', type: 'success' })
        setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
        setBlogs([...blogs]);
      }
    } catch (error) {
      console.log('error:', error);
      setNotificationMessage({ msj: 'update error', type: 'error' })
      setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
    }
  }

  const handleDeleteBlog = async () => {

    try {
      if (window.confirm(`Do you really want to delete the blog?: ${blog.title}`)) {

        const responseDeleteBlog = await blogService.deleteBlog(blog.id)
        //console.log(responseDeleteBlog)
        if (responseDeleteBlog && responseDeleteBlog.status === 204) {
          setNotificationMessage({ msj: 'successful elimination', type: 'success' })
          setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
          setBlogs(blogs.filter(b => b.id !== blog.id))
        }
      }

    } catch (error) {
      console.log('error:', error);
      setNotificationMessage({ msj: 'elimination error', type: 'error' })
      setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
    }
  }
  return (
    <div style={blogStyle}>
      title: {blog.title},
      author: {blog.author}
      <button onClick={() => handleView(blog.title)}>{showDetails ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        url : {blog.url} <br></br>
        likes: {blog.likes} <button onClick={() => handleUpdateLikesBlog()}>like</button><br></br>
        user: {blog.user.name}<br></br>
        <button onClick={() => handleDeleteBlog()}>Delete</button>
      </div>
    </div>
  )
}

export default Blog