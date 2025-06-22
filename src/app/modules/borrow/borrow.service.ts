import { Book } from "../book/book.model";
import { Borrow } from "./borrow.model";

export const createBorrowService = async (
  book: string,
  quantity: number,
  dueDate: string
) => {
  const findBook = await Book.findById(book);

  if (!findBook) {
    throw new Error("Book not found");
  }

  if (findBook.copies <= 0) {
    throw new Error("No copies available for borrowing");
  }

  if (findBook.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  if (!findBook.available) {
    throw new Error("Book is currently unavailable");
  }

  const createBorrow = await Borrow.create({ book, quantity, dueDate });

  await createBorrow.updateBook(book);

  return createBorrow;
};

export const getAllBorrowService = async () => {
  const borrowedBooks = await Borrow.aggregate([

    {
      $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } },
    },

    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },

    {
      $unwind: {
        path: "$bookDetails",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        book: {
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
        },
        totalQuantity: 1,
        _id: 0,
      },
    },
  ]);

  return borrowedBooks;
};