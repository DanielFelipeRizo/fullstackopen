import Book from "../models/book.js";
import Author from "../models/author.js";
import User from "../models/user.js";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const resolvers = {
  Query: {
    booksCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),

    allBooks: async (root, args) => {
      let books = await Book.find({}).populate("author");

      // Filtra libros sin autor
      books = books.filter(book => book.author);

      const booksFilter = books.filter((book) => {
        const matchesAuthor = !args.author || book.author.name === args.author;
        const matchesGenre = !args.genre || book.genres.includes(args.genre);
        return matchesAuthor && matchesGenre;
      });

      return booksFilter;
    },

    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({}).populate("author");

      const authorsWithBookCount = authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author && book.author.name === author.name // validar que el campo name exista
        ).length;
        return {
          ...author.toObject(),
          id: author._id, // se debe establecer el id manualmente para evitar errores
          bookCount
        };
      });

      return authorsWithBookCount;
    },

    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      if (args.author.length < 4) {
        throw new GraphQLError(
          "Author name must be at least 4 characters long",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
            },
          }
        );
      }

      if (args.title.length < 2) {
        throw new GraphQLError("Title must be at least 2 characters long", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author, born: null });
      }

      const book = new Book({ ...args, author: author._id });

      try {
        await author.save()
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving author or book failed', {
          extensions: {
            code: 'BAD_INPUT',
            invalidArgs: args,
            error
          }
        })
      }

      return book.populate("author");
    },

    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      const bookCount = await Book.countDocuments({ author: author._id });

      return {
        name: author.name,
        id: author._id,
        born: author.born,
        bookCount,
      };
    },

    createUser: async (root, args) => {

      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  // se modifica el resolver de Author para calcular bookCount dinámicamente
  Author: {
    bookCount: async (parent) => {
      // parent es el objeto Author
      return await Book.countDocuments({ author: parent.id || parent._id });
    }
  },
}

export default resolvers;
