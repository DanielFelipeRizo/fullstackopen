import { useEffect } from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesFilter from './components/AnecdotesFilter'
import Notification from './components/Notification'
import anecdotesServices from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesServices.getAll()
    .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <Notification />
      <AnecdotesList />
      <AnecdotesFilter />
      <AnecdoteForm />
    </div>
  )
}

export default App