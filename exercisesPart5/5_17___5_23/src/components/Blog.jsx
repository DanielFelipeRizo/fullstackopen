import { useState } from 'react'

const Blog = ({ blog, user, handleUpdateLikesBlog, handleDeleteBlog }) => {

  const [showDetails, setShowDetails] = useState(false)

  //estilos en linea
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisibleDetails = { display: showDetails ? '' : 'none' }
  const showWhenVisibleDeleteButton = { display: '' }

  const handleView = (title) => {
    //console.log('click in', title)
    setShowDetails(!showDetails)
  }

  //se encarga de ocultar el boton de eliminar si el usuario logueado no es el mismo que creo el blog
  if(blog.user.username !== user.username) {
    showWhenVisibleDeleteButton.display = 'none'
  }

  return (
    <div style={blogStyle} className='blog'>
      <li>
        title: {blog.title},
        author: <span>{blog.author}</span>
        <button id='buttonDetailsVisibility' onClick={() => handleView(blog.title)}>{showDetails ? 'hide' : 'show'}</button>
        <div style={showWhenVisibleDetails} className='blogDetails'>
          url: {blog.url} <br></br>
          likes: {blog.likes} <button id='buttonAddLikes' onClick={handleUpdateLikesBlog}>like</button><br></br>
          user: {blog.user.name}<br></br>
          <button id = 'buttonDeleteBlog' style={showWhenVisibleDeleteButton} onClick={handleDeleteBlog}>Delete</button>
        </div>
      </li>
    </div>
  )
}

export default Blog