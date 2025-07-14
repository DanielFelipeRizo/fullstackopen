import Book from "../models/book.js";
import Author from "../models/author.js";

const resolvers = {
  Query: {
    dummy: () => 0,
    // booksCount: () => books.length,
    // authorCount: () => authors.length,

    // allBooks: (root, args) => {
    //   return books.filter((book) => {
    //     const matchesAuthor = !args.author || book.author === args.author;
    //     const matchesGenre = !args.genre || book.genres.includes(args.genre);
    //     return matchesAuthor && matchesGenre;
    //   });
    // },

    //   allAuthors: () => {
    //     return authors.map((author) => {
    //       const bookCount = books.filter(
    //         (book) => book.author === author.name
    //       ).length;
    //       return { ...author, bookCount };
    //     });
    //   },
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author, born: null });
        await author.save();
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
  },
};

export default resolvers;