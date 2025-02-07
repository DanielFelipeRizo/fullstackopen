import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesFilter from './components/AnecdotesFilter'

const App = () => {

  return (
    <div>
      <AnecdotesFilter />
      <AnecdotesList />      
      <AnecdoteForm />
    </div>
  )
}

export default App