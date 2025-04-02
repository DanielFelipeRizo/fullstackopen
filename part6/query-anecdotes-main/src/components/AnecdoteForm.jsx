import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      console.log('new anecdote', newAnecdote)
      const anecdotes = queryClient.getQueryData( ['anecdotes'] )
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      // console.log('error', error)
      dispatch({ type: "SET_NOTIFICATION", payload: error.response.data.error })
      setTimeout(() => { dispatch({ type: "CLEAR_NOTIFICATION" }) }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0 })
   // console.log('new anecdote', {content, votes: 0 });
    
    dispatch({ type: "SET_NOTIFICATION", payload: `you created '${content}'` })
    setTimeout(() => { dispatch({ type: "CLEAR_NOTIFICATION" }) }, 5000)
    // console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
