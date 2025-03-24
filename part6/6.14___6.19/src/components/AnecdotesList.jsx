import { useDispatch, useSelector } from "react-redux";
import { setNotification } from '../reducers/notificationReducer'
import { updateVotes } from '../reducers/anecdoteReducer'

const AnecdotesList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    
    if(state.filter === '') {
      return state.anecdotes
    }
    
    return state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const vote = (anecdote) => {
    dispatch(updateVotes(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  const anecdotesSortedByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesSortedByVotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdotesList