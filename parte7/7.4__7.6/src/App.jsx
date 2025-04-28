import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import About from './components/About'
import Menu from './components/Menu'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import initialNotes from './initialNotes'
import Notification from './components/Notification'


const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialNotes)

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    // console.log('anecdote');
    // console.log(anecdote);
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/:id' element={<Anecdote anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create'
          element={notification.length < 1 ?
            <CreateNew addNew={addNew} /> :
            <Navigate replace to='/' />} />
        {/* <Route path='/create' element={<CreateNew addNew={addNew}/>} /> */}

      </Routes>
      <Footer />
    </div>
  )
}

export default App
