import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import InfoUsers from "./components/InfoUsers";
import UserBlogs from "./components/UserBlogs";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUserFromStorage } from "./reducers/authReducer";
import { logout } from "./reducers/authReducer";
import {
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import BlogDetails from "./components/BlogDetails";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.auth);
  console.log("user", user);

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

  console.log("user", user);

  return (
    <div>
      <div>
        <Link to="/">home </Link>
        <Link to="/users">users </Link>
        <Link to="/blogs">blogs </Link>

        {user ? <em>{user.name} logged in</em> : <Link to="/login">login</Link>}

        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>

      <h2>welcome to blogs</h2>
      <div>
        <Notification />
      </div>

      <Routes>
        <Route
          path="/"
          element={user ? <Blogs /> : <Navigate replace to="/login" />}
        />
        <Route path="/users/:id" element={<UserBlogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route
          path="/users"
          element={user ? <InfoUsers /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/blogs"
          element={user ? <Blogs /> : <Navigate replace to="/login" />}
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate replace to="/" />
            ) : (
              <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
