const typeDefs = `

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
  username: String!
  friends: [Author!]!
  id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    booksCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int
    ): Author

    createUser(
      username: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token  
  }
`;

export default typeDefs;