import { useState } from 'react'

const Blog = ({ blog, handleUpdateLikesBlog, handleDeleteBlog }) => {

  const [showDetails, setShowDetails] = useState(false)

  //estilos en linea
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const handleView = (title) => {
    //console.log('click in', title)
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle} className='blog'>
      title: {blog.title},
      author: {blog.author}
      <button id='buttonDetailsVisibility' onClick={() => handleView(blog.title)}>{showDetails ? 'hide' : 'show'}</button>
      <div style={showWhenVisible} className='blogDetails'>
        url : {blog.url} <br></br>
        likes: {blog.likes} <button id='buttonAddLikes' onClick={handleUpdateLikesBlog}>like</button><br></br>
        user: {blog.user.name}<br></br>
        <button onClick={handleDeleteBlog}>Delete</button>
      </div>
    </div>
  )
}

export default Blog