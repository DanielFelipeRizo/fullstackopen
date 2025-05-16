import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/login";

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

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
