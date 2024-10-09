import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import '../index.css'

const App = () => {

  const [blogForm, setBlogForm] = useState({ title: '', author: '', url: '', likes: 0, user: '' })
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [messageAndType, setNotificationMessage] = useState({ msj: null, type: null })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAllBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage({ msj: 'login success', type: 'success' })
      setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
    } catch (exception) {
      console.log('exception')
      console.log(exception)

      setNotificationMessage({ msj: 'failed login', type: 'error' })
      setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)

    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogsappUser')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const responseCreateBlog = await blogService.create(blogForm)

      // console.log('respuesta')
      // console.log(responseCreateBlog)

      if (responseCreateBlog) {
        setNotificationMessage({ msj: 'creation success', type: 'success' })
        setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)

        // Asignar el usuario actual al blog creado
        const blogWithUser = { ...responseCreateBlog, user: { ...user } }

        // Actualizar el estado con el blog modificado
        setBlogs(blogs.concat(blogWithUser))

        //setBlogs(blogs.concat(responseCreateBlog))

        setBlogForm({ title: '', author: '', url: '', likes: 0, user: '' })
      }
    } catch (error) {
      console.log('error:', error)
      setNotificationMessage({ msj: 'creation error', type: 'error' })
      setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
    }
  }

  const handleUpdateLikesBlog = async (blog) => {

    try {
      blog.likes = blog.likes + 1
      const responseUpdateBlog = await blogService.update(blog.id, blog)

      if (responseUpdateBlog.data) {
        setNotificationMessage({ msj: 'update like success', type: 'success' })
        setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
        setBlogs([...blogs])
      }
    } catch (error) {
      console.log('error:', error)
      setNotificationMessage({ msj: 'update error', type: 'error' })
      setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
    }
  }

  const handleDeleteBlog = async (blog) => {

    try {
      if (window.confirm(`Do you really want to delete the blog?: ${blog.title}`)) {

        const responseDeleteBlog = await blogService.deleteBlog(blog.id)

        if (responseDeleteBlog && responseDeleteBlog.status === 204) {
          setNotificationMessage({ msj: 'successful elimination', type: 'success' })
          setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
          setBlogs(blogs.filter(b => b.id !== blog.id))
        }
      }

    } catch (error) {
      console.log('error:', error)
      setNotificationMessage({ msj: 'elimination error', type: 'error' })
      setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
    }
  }

  const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>welcome to blogs</h2>
      <Notification messageAndType={messageAndType} />

      {!user &&
        <Togglable buttonLabel='log in'>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      }

      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button type="button" onClick={handleLogout}>logout</button>

        <Togglable buttonLabel='new blog'>
          <BlogForm
            handleCreateBlog={handleCreateBlog}
            blog={blogForm}
            setBlog={setBlogForm}
          />
        </Togglable>

        {blogsSortedByLikes.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdateLikesBlog={() => handleUpdateLikesBlog(blog)}
            handleDeleteBlog={() => handleDeleteBlog(blog)}
          />
        )}
      </div>
      }
    </div>
  )
}

export default App