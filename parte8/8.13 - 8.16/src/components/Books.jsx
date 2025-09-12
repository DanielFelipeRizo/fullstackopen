const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = props.books;

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
