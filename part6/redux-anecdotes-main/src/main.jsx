import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

// console.log('estado: ', store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
