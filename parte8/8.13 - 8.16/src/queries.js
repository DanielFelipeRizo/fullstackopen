import { gql } from "@apollo/client";

export const All_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author{
        name
        born
        bookCount
        id
      }
      published
      genres
    }
  }
`;

export const BOOKS_BY_AUTHOR_GENRE = gql`
  query booksByAuthorGenre($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author{
        name
        born
        bookCount
        id
      }
      published
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
      addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
      ) {
          title
          author {
            name
            id
            born
            bookCount
          }
          published
          genres
          id
        }
    }
`;

export const EDIT_BORN_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        born
      }
    }
  }`

