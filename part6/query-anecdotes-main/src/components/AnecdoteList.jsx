import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteList = ( ) => {

  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdoteUpdated) => {

      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],
        anecdotes.map(anecdote => anecdote.id === anecdoteUpdated.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
      )
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: "SET_NOTIFICATION", payload: `you voted '${anecdote.content}'` })
    setTimeout(() => { dispatch({ type: "CLEAR_NOTIFICATION" }) }, 5000)
  }

  if (result.isError) {
    return <span>Error: anecdote service not available due to problems in server.</span>
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default AnecdoteList