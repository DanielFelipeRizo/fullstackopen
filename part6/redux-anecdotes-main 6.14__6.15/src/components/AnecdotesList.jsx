import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'


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
    // console.log('vote', id)
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => { dispatch(setNotification('')) }, 5000)
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