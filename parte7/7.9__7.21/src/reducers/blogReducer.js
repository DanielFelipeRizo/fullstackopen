import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {

    addLikeBlog(state, action) {
      const id = action.payload
      const blogToUpdate = state.find(b => b.id === id)

      if (blogToUpdate) {
        blogToUpdate.likes++
      }
    },

    appendBlog(state, action){
      state.push(action.payload)
    },

    setBlogs(state, action){
      return action.payload
    },
    
    deleteBlog(state, action){
      const id = action.payload
      return state.filter(b => b.id !== id)
    }
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log('blogs desde reducer', blogs);
    
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  console.log('content:', blogObject);
  
  return async (dispatch) => {
    const newblog = await blogService.create(blogObject)
    dispatch(appendBlog(newblog))
  }
}

export const updateLikes = (blogObject) => {
  return async (dispatch) => {
    const updatedblog = await blogService.updateLikes(blogObject)
    dispatch(addLikeBlog(updatedblog.id))
  }
}

export const deleteBlogObj = (id) => {
  return async (dispatch) => {
    const responseDeleteBlog = await blogService.deleteBlog(id)

    if (responseDeleteBlog && responseDeleteBlog.status === 204) {
      dispatch(deleteBlog(id))
    }
  }
}

export const { addLikeBlog, appendBlog, setBlogs, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
