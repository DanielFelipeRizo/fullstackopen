import blogService from "../services/blogs";
import loginService from "../services/login";

export const initializeUserFromStorage = (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser");

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    dispatch({ type: "SET_USER", payload: user });
  }
};

export const loginUser = async ({ username, password }, dispatch) => {
  try {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedBlogsappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({ type: "SET_USER", payload: user });

    return "success";
  } catch (error) {
    return error;
  }
};

export const logout = (dispatch) => {
  window.localStorage.removeItem("loggedBlogsappUser");
  dispatch({ type: "LOGOUT_USER" });
};
