import { useState } from 'react';

const Books = (props) => {

  const [selectedGenre, setSelectedGenre] = useState(null);


  console.log('props', props.books);
  

  if (!props.show) {
    return null
  }

  const books = props.books;
  const genresBooks = books.map(b => b.genres).flat().filter((v, i, a) => a.indexOf(v) === i);

  // Filtrar libros por género seleccionado
  const filteredBooks = selectedGenre
    ? books.filter(b => b.genres.includes(selectedGenre))
    : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <div>
        <h5>Genres</h5>
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
        {genresBooks.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>
        ))}
      </div>
      <br />

    </div>
  )
}

import PropTypes from 'prop-types'

Books.propTypes = {
  show: PropTypes.bool,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        born: PropTypes.number,
        id: PropTypes.string
      }),
      published: PropTypes.number
    })
  ).isRequired
}

export default Books
