"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("./app/modules/book/book.routes");
const borrow_routes_1 = require("./app/modules/borrow/borrow.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(book_routes_1.bookRoutes);
app.use(borrow_routes_1.borrowRoutes);
app.get("/", (req, res) => {
    try {
        res.json({
            message: "✅ Library Management Server is Running...",
        });
    }
    catch (error) {
        res.json({
            message: "✅ Something Went Wrong",
            error: error,
        });
    }
});
exports.default = app;
