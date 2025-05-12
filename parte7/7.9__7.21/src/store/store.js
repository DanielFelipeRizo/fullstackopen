import { configureStore } from "@reduxjs/toolkit";
// import anecdoteReducer from '../reducers/anecdoteReducer'
// import filterReducer from '../reducers/filterReducer'
import notificationReducer from "../reducers/notificationReducer";
import blogReducer from '../reducers/blogReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer
  },
});

export default store;
