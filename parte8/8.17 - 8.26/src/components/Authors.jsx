import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BORN_AUTHOR } from '../queries'
import Select from 'react-select'
import customStyles from '../styles/selectStyles'


const Authors = ({ authors, show, setError }) => {

  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')

  const [changeBorn, result] = useMutation(EDIT_BORN_AUTHOR)

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found')
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({
      variables: { name, setBornTo: parseInt(setBornTo) }
    })

    // console.log('result', result);

    setName('')
    setBorn('')
  }

  // convertir los autores a formato compatible con react-select
  const authorOptions = authors
    .map((author) => ({
      value: author.name,
      label: author.name,
    }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>

      <form onSubmit={submit}>


        <div>
          <label>Author</label>
          <Select
            options={authorOptions}
            onChange={(selectedOption) => setName(selectedOption.value)}
            placeholder="Selecciona un autor..."
            isSearchable
            styles={customStyles}
          />
        </div>

        <div>
          born
          <input
            type='number'
            value={setBornTo}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

import PropTypes from 'prop-types'

Authors.propTypes = {
  show: PropTypes.bool,
  setError: PropTypes.func,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      born: PropTypes.number,
      bookCount: PropTypes.number
    })
  ).isRequired
}

export default Authors
