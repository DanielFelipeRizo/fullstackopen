import { createContext, useReducer } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload
    case "LOGOUT_USER":
      return null
    default:
      return state
  }
}

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, 0);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext;