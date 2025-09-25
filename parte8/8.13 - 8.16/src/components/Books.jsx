import { useState } from 'react';
import { useQuery } from '@apollo/client'
import { BOOKS_BY_AUTHOR_GENRE } from "../queries";

const Books = (props) => {

  const [selectedGenre, setSelectedGenre] = useState(null);
  
  const result = useQuery(BOOKS_BY_AUTHOR_GENRE, {
    variables: { genre: selectedGenre }
  });


  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data?.allBooks ?? [];


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
  show: PropTypes.bool
}

export default Books
