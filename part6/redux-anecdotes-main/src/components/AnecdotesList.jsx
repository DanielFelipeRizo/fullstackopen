import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdotesList = () => {

  const dispatch = useDispatch()
  // const anecdotes = useSelector((state) => state.anecdotes)
  const anecdotes = useSelector((state) => {
    if(state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const vote = (id) => {
    // console.log('vote', id)
    dispatch(voteAnecdote(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )

}

export default AnecdotesList