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
import { Navbar, Nav, Button } from 'react-bootstrap'

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

  const padding = {
    padding: 5
  }

  return (
    <div className="container">
      <div>
        {user && (
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">home</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/blogs">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {user
                    ? <em style={padding}>{user.name} logged in</em>
                    : <Link style={padding} to="/login">login</Link>
                  }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>

            <Button type="button" onClick={handleLogout}>
              logout
            </Button>

          </Navbar>


        )}

        <h2>welcome to blogs</h2>
        <div>
          <Notification />
        </div>

        <Routes>
          <Route
            path="/"
            element={user ? <Blogs /> : <Navigate replace to="/login" />}
          />
          <Route path="/users/:id" element={user ? <UserBlogs /> : <Navigate replace to="/login" />} />
          <Route path="/blogs/:id" element={user ? <BlogDetails /> : <Navigate replace to="/login" />} />
          <Route path="/users" element={user ? <InfoUsers /> : <Navigate replace to="/login" />} />
          <Route path="/blogs" element={user ? <Blogs /> : <Navigate replace to="/login" />} />

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
    </div>
  );
};

export default App;
