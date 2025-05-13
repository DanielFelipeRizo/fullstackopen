import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import "../index.css";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogsappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(
        setNotification({ msj: "login success", type: "success", seconds: 5 }),
      );
    } catch (exception) {
      console.log("exception");
      console.log(exception);

      dispatch(
        setNotification({ msj: "failed login", type: "error", seconds: 5 }),
      );
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogsappUser");
  };

  // const handleCreateBlog = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const responseCreateBlog = await blogService.create(blogForm);

  //     // console.log('respuesta')
  //     // console.log(responseCreateBlog)

  //     if (responseCreateBlog) {
  //       dispatch(
  //         setNotification({ msj: "creation success", type: "success", seconds: 5 })
  //       );
  //       // Asignar el usuario actual al blog creado
  //       const blogWithUser = { ...responseCreateBlog, user: { ...user } };

  //       // Actualizar el estado con el blog modificado
  //       setBlogs(blogs.concat(blogWithUser));

  //       //setBlogs(blogs.concat(responseCreateBlog))

  //       setBlogForm({ title: "", author: "", url: "", likes: 0, user: "" });
  //     }
  //   } catch (error) {
  //     dispatch(
  //       setNotification({ msj: "creation error", type: "error", seconds: 5 })
  //     );
  //   }
  // };

  // const handleUpdateLikesBlog = async (blog) => {
  //   try {
  //     blog.likes = blog.likes + 1;
  //     const responseUpdateBlog = await blogService.update(blog.id, blog);

  //     if (responseUpdateBlog.data) {
  //       dispatch(
  //         setNotification({ msj: "update like success", type: "success", seconds: 5 }),
  //       );
  //       console.log('estado: ', store.getState())

  //       setBlogs([...blogs]);
  //     }
  //   } catch (error) {
  //     console.log("error:", error);
  //     dispatch(
  //       setNotification({ msj: "update error", type: "error", seconds: 5 })
  //     );
  //   }
  // };

  // const handleDeleteBlog = async (blog) => {
  //   try {
  //     if (
  //       window.confirm(`Do you really want to delete the blog?: ${blog.title}`)
  //     ) {
  //       const responseDeleteBlog = await blogService.deleteBlog(blog.id);

  //       if (responseDeleteBlog && responseDeleteBlog.status === 204) {
  //         setBlogs(blogs.filter((b) => b.id !== blog.id));
  //         dispatch(
  //           setNotification({ msj: "successful elimination", type: "success", seconds: 5 })
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     dispatch(
  //       setNotification({ msj: "failed elimination", type: "error", seconds: 5 })
  //     );
  //   }
  // };

  return (
    <div>
      <h2>welcome to blogs</h2>
      <Notification />

      {!user && (
        <Togglable buttonLabel="log in">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button type="button" onClick={handleLogout}>
            logout
          </button>

          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>

          <Blog user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
