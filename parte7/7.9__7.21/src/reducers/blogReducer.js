import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addLikeBlog(state, action) {
      const id = action.payload;
      const blogToUpdate = state.find((b) => b.id === id);

      if (blogToUpdate) {
        blogToUpdate.likes++;
      }
    },

    appendBlog(state, action) {
      state.push(action.payload);
    },

    addCommentBlog(state, action) {
      const newBlog = action.payload;
      const blogToUpdate = state.find((b) => b.id === newBlog.id);
      if (blogToUpdate.comments) {
        blogToUpdate.comments = newBlog.comments || [];
      }
    },

    setBlogs(state, action) {
      return action.payload;
    },

    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newblog = await blogService.create(blogObject);
    dispatch(appendBlog(newblog));
  };
};

export const createCommentBlog = (id, commentObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.createComment(id, commentObject);

    if (newBlog.comments) {
      dispatch(addCommentBlog(newBlog));
    }
  };
};

export const updateLikes = (id, blogObject) => {
  return async (dispatch) => {
    const updatedblog = await blogService.updateLikes(id, blogObject);
    dispatch(addLikeBlog(updatedblog.id));
  };
};

export const deleteBlogObj = (id) => {
  return async (dispatch) => {
    const responseDeleteBlog = await blogService.deleteBlog(id);

    const wasDeleted = responseDeleteBlog?.status === 204;
    
    if (wasDeleted) dispatch(deleteBlog(id));
  };
};

export const { addLikeBlog, appendBlog, setBlogs, deleteBlog, addCommentBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
