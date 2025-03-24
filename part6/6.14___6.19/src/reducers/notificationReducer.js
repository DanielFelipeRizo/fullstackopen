import { createSlice } from '@reduxjs/toolkit'

const initialState = 'default notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setStateNotification(state, action) {
      return action.payload
    }
  }
})

export const setNotification = (content, seconds) => {

  return (dispatch) => {
    dispatch(setStateNotification(content))
    setTimeout(() => { dispatch(setStateNotification('')) }, seconds*1000)
  }
}

export const { setStateNotification } = notificationSlice.actions
export default notificationSlice.reducer
