import { useState,  useImperativeHandle, forwardRef } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setNotificationMessage }) => {

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

  const handleUpdateBlog = async () => {

    try {
        blog.likes = blog.likes + 1
        const responseUpdateBlog = await blogService.update(blog.id, blog)
        console.log('responseUpdateBlog');
        console.log(responseUpdateBlog);

        if (responseUpdateBlog.data) {
            setNotificationMessage({ msj: 'update like success', type: 'success' })
            setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)

        }
    } catch (error) {
        console.log('error:', error);
        setNotificationMessage({ msj: 'update error', type: 'error' })
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
        likes: {blog.likes} <button onClick={() => handleUpdateBlog()}>like</button><br></br>
        user: {blog.user.name}
      </div>
    </div>
  )
}

export default Blog