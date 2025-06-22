import { Book } from "./book.model";

// ---- Create Book Service ------
export const createBookService = async (book: object) => {
  const newBook = await Book.create(book);
  return newBook;
};

// ------ Get Book Service -----
export const getBooksService = async (query: any) => {
  const filter: any = {};
  const sorting: any = {};

  if (query.filter) {
    filter.genre = query.filter;
  }

  if (query.sortBy && query.sort) {
    sorting[query.sortBy] = query.sort === "asc" ? 1 : -1;
  }

  let queryBuilder = Book.find(filter);

  if (Object.keys(sorting).length > 0) {
    queryBuilder = queryBuilder.sort(sorting);
  }

  const limit =
    query.limit && Number(query.limit) > 0 ? Number(query.limit) : 10;
  queryBuilder = queryBuilder.limit(limit);

  const allBooks = await queryBuilder;
  return allBooks;
};

// ------ Get Single Book Service -----
export const getSingleBookService = async (bookId: string) => {
  const book = await Book.findById(bookId);
  return book;
};

// ----- Update Book Service -----
export const updateBookService = async (bookId: object, newData: object) => {
  const updatedBook = await Book.findOneAndUpdate(bookId, newData, {
    new: true,
  });
  return updatedBook;
};

// ----- Delete Book Service ------
export const deleteBookService = async (bookId: string) => {
  const deleteBook = await Book.findByIdAndDelete(bookId);
  return deleteBook;
};