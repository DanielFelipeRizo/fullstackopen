import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ username, setUsername, password, setPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
    setUsername("");
    setPassword("");

    navigate('/'); // redireccion a la página principal después de iniciar sesión
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>

        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control className="w-auto"
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control className="w-auto"
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit">login</Button>
      </Form>
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
