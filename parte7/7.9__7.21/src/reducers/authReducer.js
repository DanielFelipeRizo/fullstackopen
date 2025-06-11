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
      const decodedToken = parseJwt(user.token);
      const exp = decodedToken?.exp;

      if (exp) {
        const expiresIn = exp * 1000 - Date.now(); // tiempo restante en ms

        if (expiresIn > 0) {
          setTimeout(() => {
            dispatch(logoutUser());
            window.localStorage.removeItem("loggedBlogsappUser");
            dispatch(
              setNotification({
                msj: "sesion expired",
                type: "error",
                seconds: 5,
              }),
            );
          }, expiresIn);
        } else {
          dispatch(logoutUser());
          window.localStorage.removeItem("loggedBlogsappUser");
        }
      }

      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogsappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      const decodedToken = parseJwt(user.token);
      const exp = decodedToken?.exp;

      if (exp) {
        const expiresIn = exp * 1000 - Date.now();

        if (expiresIn > 0) {
          setTimeout(() => {
            dispatch(logoutUser());
            window.localStorage.removeItem("loggedBlogsappUser");

            dispatch(
              setNotification({
                msj: "sesion expired",
                type: "error",
                seconds: 5,
              }),
            );
          }, expiresIn);
        }
      }

      dispatch(setUser(user));
      dispatch(
        setNotification({ msj: "login success", type: "success", seconds: 5 }),
      );
    } catch (exception) {
      dispatch(
        setNotification({ msj: "failed login", type: "error", seconds: 5 }),
      );
      return exception;
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutUser());
    window.localStorage.removeItem("loggedBlogsappUser");
  };
};

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
