import { configureStore } from "@reduxjs/toolkit";
// import anecdoteReducer from '../reducers/anecdoteReducer'
// import filterReducer from '../reducers/filterReducer'
import notificationReducer from "../reducers/notificationReducer";
import blogReducer from '../reducers/blogReducer';
import authReducer from '../reducers/authReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    auth: authReducer
  },
});

export default store;
