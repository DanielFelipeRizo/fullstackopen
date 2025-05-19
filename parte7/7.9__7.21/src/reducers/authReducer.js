import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "../reducers/notificationReducer";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logoutUser() {
      return null;
    },
  },
});

export const initializeUserFromStorage = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogsappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(setUser(user));

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
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutUser());
    window.localStorage.removeItem("loggedBlogsappUser");
  };
};

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
