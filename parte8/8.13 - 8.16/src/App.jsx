import { useQuery } from '@apollo/client';
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import { All_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState("authors");
  const result_all_authors = useQuery(All_AUTHORS);
  const result_all_books = useQuery(ALL_BOOKS);


  if (result_all_authors.loading || result_all_books.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  // console.log('authors', result_all_authors.data);
  // console.log('books', result_all_books.data);


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} authors={result_all_authors.data.allAuthors} setError={notify} />

      <Books show={page === "books"} books={result_all_books.data.allBooks} />

      <NewBook show={page === "add"} setError={notify} />

    </div>
  );
};

export default App;
