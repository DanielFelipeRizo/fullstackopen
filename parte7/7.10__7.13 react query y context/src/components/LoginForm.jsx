import PropTypes from "prop-types";
import { loginUser } from '../context/userActions';
import { useUserDispatch } from "../context/userContext";
import { useNotificationDispatch } from "../context/NotificationContext";

const LoginForm = ({ username, setUsername, password, setPassword }) => {

  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await loginUser({ username, password }, userDispatch);


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

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username: &nbsp;
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password: &nbsp;
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
