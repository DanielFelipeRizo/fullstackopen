import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client'
import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Notify from "./components/Notify"
import LoginForm from './components/LoginForm'
import RerecommendedBooks from './components/RecommendedBooks'

import { All_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries"
import {
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom"
import { Navbar, Nav, Button } from 'react-bootstrap'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result_all_authors = useQuery(All_AUTHORS);
  const result_all_books = useQuery(ALL_BOOKS);
  const [token, setToken] = useState(null);
  const client = useApolloClient();


  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log('data ----------> ', data)
      const addedBook = data.data.bookAdded

      // Actualizar cache de Apollo
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        if (allBooks.some(b => b.id === addedBook.id)) {
          return { allBooks }
        }
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

  if (result_all_authors.loading || result_all_books.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const padding = {
    padding: 5
  }



  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/authors">authors</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/books">books</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/addBook">add book</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/recommendedBooks">recommended</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {token
                ? <em style={padding}>logged in</em>
                : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Button type="button" onClick={logout}>
          logout
        </Button>

      </Navbar>


      <Notify errorMessage={errorMessage} />

      <Routes>
        <Route
          path="/login"
          element={
            !token
              ? <LoginForm setToken={setToken} setError={notify} />
              : <Navigate replace to="/authors" />
          }
        />
        <Route
          path="/authors"
          element={
            token
              ? <Authors show={true} authors={result_all_authors.data.allAuthors} setError={notify} />
              : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/books"
          element={
            token
              ? <Books show={true} />
              : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/addBook"
          element={
            token
              ? <NewBook show={true} setError={notify} />
              : <Navigate replace to="/login" />
          }
        />

        <Route
          path="/recommendedBooks"
          element={
            token
              ? <RerecommendedBooks books={result_all_books.data.allBooks} show={true} setError={notify} />
              : <Navigate replace to="/login" />
          }
        />

        <Route
          path="/"
          element={<Navigate replace to="/authors" />}
        />
      </Routes>
    </div>
  );
};

export default App;
