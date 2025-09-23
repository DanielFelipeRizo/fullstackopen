
const RerecommendedBooks = ({ books, show }) => {

    const username = localStorage.getItem('library-user-username')
    const booksForUser = books.filter(b=>b.author.name === username)
    console.log('books', booksForUser)
    console.log('show', show)

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>Recommendations</h2>

            <p>books in your favorite genre {username}</p>
        </div>

    )

}

export default RerecommendedBooks

