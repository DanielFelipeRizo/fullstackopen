import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import "../index.css";
import { initializeUserFromStorage, logout } from "./context/userActions";
import { useUserDispatch } from "./context/userContext";
import { useUserValue } from "./context/userContext";
import { useNotificationDispatch } from "./context/NotificationContext";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();

  useEffect(() => {
    initializeUserFromStorage(userDispatch);
  }, []);

  const handleLogout = () => {
    logout(userDispatch);

    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: { text: "logout success", style: "success" },
    });

    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 2000);
  };

  return (
    <div>
      <h2>welcome to blogs</h2>
      <Notification />

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
    </div>
  );
};

export default App;
