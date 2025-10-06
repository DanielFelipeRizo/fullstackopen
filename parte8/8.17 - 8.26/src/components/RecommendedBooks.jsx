
const RerecommendedBooks = ({ books, show }) => {

    const username = localStorage.getItem('library-user-username')
    const booksForUser = books.filter(b => b.author.name === username)

    // Contar frecuencia de géneros
    const genreCount = {}
    booksForUser.forEach(book => {
        book.genres.forEach(genre => {
            genreCount[genre] = (genreCount[genre] || 0) + 1
        })
    })

    // Encontrar el género favorito
    const favoriteGenre = Object.keys(genreCount).reduce((a, b) =>
        genreCount[a] > genreCount[b] ? a : b, null
    )

    // console.log('favoriteGenre', favoriteGenre);

    // Filtrar libros por género favorito
    const recommendedBooks = books.filter(b => b.genres.includes(favoriteGenre))

    // console.log('recommendedBooks', recommendedBooks);

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>Recommendations</h2>

            <p>books in your favorite genre {username}</p>


            <table>
                <tbody>
                    <tr>
                        <th>book</th>
                        <th>author</th>
                        <th>published</th>
                        <th>genres</th>
                    </tr>
                    {recommendedBooks.map((b) => (
                        <tr key={b.title}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                            <td>{b.genres.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )

}

export default RerecommendedBooks

