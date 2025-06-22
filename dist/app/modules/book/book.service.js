"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookService = exports.updateBookService = exports.getSingleBookService = exports.getBooksService = exports.createBookService = void 0;
const book_model_1 = require("./book.model");
// ---- Create Book Service ------
const createBookService = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.Book.create(book);
    return newBook;
});
exports.createBookService = createBookService;
// ------ Get Book Service -----
const getBooksService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    const sorting = {};
    if (query.filter) {
        filter.genre = query.filter;
    }
    if (query.sortBy && query.sort) {
        sorting[query.sortBy] = query.sort === "asc" ? 1 : -1;
    }
    let queryBuilder = book_model_1.Book.find(filter);
    if (Object.keys(sorting).length > 0) {
        queryBuilder = queryBuilder.sort(sorting);
    }
    const limit = query.limit && Number(query.limit) > 0 ? Number(query.limit) : 10;
    queryBuilder = queryBuilder.limit(limit);
    const allBooks = yield queryBuilder;
    return allBooks;
});
exports.getBooksService = getBooksService;
// ------ Get Single Book Service -----
const getSingleBookService = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId);
    return book;
});
exports.getSingleBookService = getSingleBookService;
// ----- Update Book Service -----
const updateBookService = (bookId, newData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield book_model_1.Book.findOneAndUpdate(bookId, newData, {
        new: true,
    });
    return updatedBook;
});
exports.updateBookService = updateBookService;
// ----- Delete Book Service ------
const deleteBookService = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBook = yield book_model_1.Book.findByIdAndDelete(bookId);
    return deleteBook;
});
exports.deleteBookService = deleteBookService;
