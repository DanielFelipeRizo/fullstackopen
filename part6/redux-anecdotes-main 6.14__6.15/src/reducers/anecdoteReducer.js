import { createSlice } from '@reduxjs/toolkit'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },

    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)

      if (anecdoteToVote) {
        anecdoteToVote.votes++
      }
    },

    setAnecdotes(state, action){
      return action.payload
    }
  },
})

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
