import { createSlice } from "@reduxjs/toolkit";

// const initialState = 'default notification'
const initialState = {
  msj: null,
  type: null,
  seconds: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setStateNotification(state, action) {
      return action.payload;
    },
  },
});

export const setNotification = ({ msj, type, seconds }) => {
  return (dispatch) => {

    dispatch(setStateNotification({ msj, type, seconds }));
    
    setTimeout(() => {
      dispatch(setStateNotification({ msj: null, type: null, seconds: null }));
    }, seconds * 1000);
  };
};

export const { setStateNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
