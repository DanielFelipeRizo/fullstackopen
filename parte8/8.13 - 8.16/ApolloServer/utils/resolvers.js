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
          (book) => book.author.name === author.name
        ).length;
        return { ...author.toObject(), bookCount };
      });

      return authorsWithBookCount;
    },
  },

  Mutation: {
    addBook: async (root, args) => {
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

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author, born: null });

        await author.save();
      }

      if (args.title.length < 2) {
        throw new GraphQLError("Title must be at least 2 characters long", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      const book = new Book({ ...args, author: author._id });
      await book.save();

      return book.populate("author");
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;

      author.born = args.setBornTo;
      await author.save();

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

      return { value: jwt.sign(userForToken, process.env.SECRET) };
    },
  },
};

export default resolvers;
