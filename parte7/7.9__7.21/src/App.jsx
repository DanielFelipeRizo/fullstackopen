import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import InfoUsers from "./components/InfoUsers";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUserFromStorage } from "./reducers/authReducer";
import { logout } from "./reducers/authReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <div>
      <Router>
        <h2>welcome to blogs</h2>
        <div>
          <Notification />
        </div>

        <div>
          <Link to="/">home </Link>
          <Link to="/users">users </Link>
          <Link to="/blogs">blogs </Link>
        </div>

        <Routes>
          <Route path = '/' element={<h2>home</h2>}/>
          <Route path = '/users' element={<InfoUsers/>}/>
          <Route path = '/blogs' element={<h2>blogs</h2>}/>
        </Routes>

        {!user && (
          <Togglable buttonLabel="log in">
            <LoginForm
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
      </Router>
    </div>
  );
};

export default App;
