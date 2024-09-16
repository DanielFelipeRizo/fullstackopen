import { useState, useImperativeHandle, forwardRef } from 'react'

const Blog = ({ blog }) => {

  const [showDetails, setShowDetails] = useState(false)

  //estilos en linea
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const handleView = (title) => {
    console.log('click in', title)
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
      title: {blog.title},
      author: {blog.author}
      <button onClick={() => handleView(blog.title)}>{showDetails ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        url : {blog.url} <br></br>
        likes: {blog.likes}<br></br>
        user: {blog.user.name}
      </div>
    </div>
  )
}

export default Blog