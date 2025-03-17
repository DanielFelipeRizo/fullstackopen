import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesFilter from './components/AnecdotesFilter'
import Notification from './components/Notification'

const App = () => {

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