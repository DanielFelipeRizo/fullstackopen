import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { v1 as uuid } from "uuid";

import { ADD_BOOK, All_AUTHORS, ALL_BOOKS } from "../queries";

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const [createBook] = useMutation(ADD_BOOK, {

    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })

      // Actualiza autores
      cache.updateQuery({ query: All_AUTHORS }, ({ allAuthors }) => {
        const addedAuthorName = response.data.addBook.author
        const existingAuthor = allAuthors.find(a => a.name === addedAuthorName)

        if (existingAuthor) {
          return {
            allAuthors: allAuthors.map(a =>
              a.name === addedAuthorName
                ? { ...a, bookCount: (a.bookCount || 0) + 1 }
                : a
            )
          }
        } else {
          const newAuthor = {
            name: addedAuthorName,
            born: null,
            bookCount: 1,
            id: uuid()
          }

          return {
            allAuthors: allAuthors.concat(newAuthor)
          }
        }
      })
    },
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log('Error al crear el libro:', messages);

      setError(messages)
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: {
        title, author, published: parseInt(published), genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

import PropTypes from 'prop-types'

NewBook.propTypes = {
  show: PropTypes.bool,
  setError: PropTypes.func
}

export default NewBook