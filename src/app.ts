import cors from "cors";
import express, { Application } from "express";
import { bookRoutes } from "./app/modules/book/book.routes";
import { borrowRoutes } from "./app/modules/borrow/borrow.routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(bookRoutes);
app.use(borrowRoutes);

app.get("/", (req, res) => {
  try {
    res.json({
      message: "✅ Library Management Server is Running...",
    });
  } catch (error) {
    res.json({
      message: "✅ Something Went Wrong",
      error: error,
    });
  }
});

export default app;