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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.getBooks = exports.createBook = void 0;
const book_service_1 = require("./book.service");
const mongoose_1 = __importDefault(require("mongoose"));
// ------ Create Book ------
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newBook = yield (0, book_service_1.createBookService)(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: error.name,
                    errors: error.errors,
                },
            });
        }
        if (error.code === 11000 && error.name === "MongoServerError") {
            const duplicatedField = Object.keys(error.keyValue)[0];
            const duplicatedValue = error.keyValue[duplicatedField];
            return res.status(409).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "DuplicateKeyError",
                    errors: {
                        [duplicatedField]: {
                            message: `The ${duplicatedField} "${duplicatedValue}" already exists.`,
                            name: "DuplicateError",
                            kind: "unique",
                            path: duplicatedField,
                            value: duplicatedValue,
                        },
                    },
                },
            });
        }
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message || error,
        });
    }
});
exports.createBook = createBook;
// ------ Get All Books Data ------
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            filter: req.query.filter,
            sortBy: req.query.sortBy,
            sort: req.query.sort,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
        };
        const allBooks = yield (0, book_service_1.getBooksService)(query);
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: allBooks,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: error.name,
                    errors: error.errors,
                },
            });
        }
        if (error.code === 11000 && error.name === "MongoServerError") {
            const duplicatedField = Object.keys(error.keyValue)[0];
            const duplicatedValue = error.keyValue[duplicatedField];
            return res.status(409).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "DuplicateKeyError",
                    errors: {
                        [duplicatedField]: {
                            message: `The ${duplicatedField} "${duplicatedValue}" already exists.`,
                            name: "DuplicateError",
                            kind: "unique",
                            path: duplicatedField,
                            value: duplicatedValue,
                        },
                    },
                },
            });
        }
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message || error,
        });
    }
});
exports.getBooks = getBooks;
// ------ Get Single Book's Data ------
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield (0, book_service_1.getSingleBookService)(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: error.name,
                    errors: error.errors,
                },
            });
        }
        if (error.code === 11000 && error.name === "MongoServerError") {
            const duplicatedField = Object.keys(error.keyValue)[0];
            const duplicatedValue = error.keyValue[duplicatedField];
            return res.status(409).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "DuplicateKeyError",
                    errors: {
                        [duplicatedField]: {
                            message: `The ${duplicatedField} "${duplicatedValue}" already exists.`,
                            name: "DuplicateError",
                            kind: "unique",
                            path: duplicatedField,
                            value: duplicatedValue,
                        },
                    },
                },
            });
        }
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message || error,
        });
    }
});
exports.getSingleBook = getSingleBook;
// ------ Update a Book's Data ------
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const newData = req.body;
        const updateBook = yield (0, book_service_1.updateBookService)({ _id: bookId }, newData);
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: updateBook,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: error.name,
                    errors: error.errors,
                },
            });
        }
        if (error.code === 11000 && error.name === "MongoServerError") {
            const duplicatedField = Object.keys(error.keyValue)[0];
            const duplicatedValue = error.keyValue[duplicatedField];
            return res.status(409).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "DuplicateKeyError",
                    errors: {
                        [duplicatedField]: {
                            message: `The ${duplicatedField} "${duplicatedValue}" already exists.`,
                            name: "DuplicateError",
                            kind: "unique",
                            path: duplicatedField,
                            value: duplicatedValue,
                        },
                    },
                },
            });
        }
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message || error,
        });
    }
});
exports.updateBook = updateBook;
// ------ Delete Book Data ------
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deletedBook = yield (0, book_service_1.deleteBookService)(bookId);
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: error.name,
                    errors: error.errors,
                },
            });
        }
        if (error.code === 11000 && error.name === "MongoServerError") {
            const duplicatedField = Object.keys(error.keyValue)[0];
            const duplicatedValue = error.keyValue[duplicatedField];
            return res.status(409).json({
                message: "Validation failed",
                success: false,
                error: {
                    name: "DuplicateKeyError",
                    errors: {
                        [duplicatedField]: {
                            message: `The ${duplicatedField} "${duplicatedValue}" already exists.`,
                            name: "DuplicateError",
                            kind: "unique",
                            path: duplicatedField,
                            value: duplicatedValue,
                        },
                    },
                },
            });
        }
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message || error,
        });
    }
});
exports.deleteBook = deleteBook;
