import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import '../index.css'

const App = () => {
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
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
      setNotificationMessage({ msj: 'success', type: 'success' })
      setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)
    } catch (exception) {
      console.log('exception');
      console.log(exception);
      console.log(messageAndType);

      setNotificationMessage(messageAndType.msj= 'wrong credentials', messageAndType.type= 'error' )
      //setTimeout(() => { setNotificationMessage({ msj: null, type: null }) }, 3000)

    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogsappUser')
  }


  return (
    <div>
      <h2>welcome to blogs</h2>
      <Notification messageAndType={messageAndType} />
      {!user &&
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword} />
      }

      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button type="button" onClick={handleLogout}>logout</button>
        <BlogForm messageAndType = {messageAndType} setNotificationMessage={setNotificationMessage} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App