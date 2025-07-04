const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const authors = props.authors

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
    </div>
  )
}

import PropTypes from 'prop-types'

Authors.propTypes = {
  show: PropTypes.bool,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      born: PropTypes.number,
      bookCount: PropTypes.number
    })
  ).isRequired
}

export default Authors
