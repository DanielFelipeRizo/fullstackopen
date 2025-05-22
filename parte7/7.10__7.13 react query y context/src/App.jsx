import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUserFromStorage, loginUser, logout } from "./reducers/authReducer";
import { useNotificationDispatch } from './NotificationContext'

// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();

  useEffect(() => {
    dispatch(initializeUserFromStorage());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(initializeBlogs());
  // }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await dispatch(loginUser({ username, password }));

    console.log(res);
    


    if (res === "success") {

      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { text: "login success", style: "success" },
      });

      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);

    } else {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { text: "failed login", style: "error" },
      });

      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);

    }

    setUsername("");
    setPassword("");
  };

  const handleLogout = async () => {
    dispatch(logout());
  }


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
