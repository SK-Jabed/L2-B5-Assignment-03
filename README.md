# 📚 Library Management API

A **robust**, **scalable**, and **feature-rich** RESTful API for managing books and borrowings in a library system. Built with **Express.js**, **TypeScript**, and **MongoDB** using **Mongoose**, this backend service offers seamless CRUD operations, real-time availability tracking, borrow management, and business-rule enforcement — making it ideal for educational institutions, digital libraries, and small-to-mid scale inventory systems.

---

## 🧩 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Benefits](#-benefits)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Start the Server](#-start-the-server)
- [Models](#-models)
- [Error Handling](#-error-handling)
- [API Documentation](#-api-documentation)
- [Mongoose Features](#-mongoose-features)
- [Testing](#-testing)
- [Security](#-security)
- [Monetization Ideas](#-monetization-ideas)
- [Contributing](#-contributing)
- [Future Roadmap](#-future-roadmap)
- [License](#-license)

---

## 🚀 Features

- 📘 CRUD operations for books
- 🔄 Real-time book availability based on stock
- 🧮 Borrowing system with quantity checks and due dates
- 📊 Borrow summary via MongoDB aggregation pipeline
- ✅ Schema validation with Mongoose
- 🧠 Static and instance methods for encapsulated logic
- ⚙️ Middleware for auto-handling logic and data transformation

---

## 🛠️ Tech Stack

- **Backend**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose

---

## 🎯 Benefits

- **Educational-Ready**: Excellent for learning backend architecture.
- **Modular & Extensible**: Easily upgradeable with new modules.
- **Production-Friendly**: Uses industry-standard practices.
- **Lightweight Deployment**: Can run on Render, Railway, or MongoDB Atlas.

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SK-Jabed/L2-B5-Assignment-03-LM-API.git
cd L2-B5-Assignment-03-LM-API
````

### 2. Install Dependencies

```bash
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=mongodb://localhost:27017/library-management
```

> For production, replace with your MongoDB Atlas URI.

---

## 🚀 Start the Server

```bash
npm run dev
```

> The server runs on: `http://localhost:5000`

---

## 📘 Models

### 📚 Book Model

| Field         | Type    | Required | Description                                                                  |
| ------------- | ------- | -------- | ---------------------------------------------------------------------------- |
| `title`       | string  | ✅        | Book title                                                                   |
| `author`      | string  | ✅        | Book author                                                                  |
| `genre`       | string  | ✅        | Enum: `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY` |
| `isbn`        | string  | ✅        | Unique ISBN identifier                                                       |
| `description` | string  | ❌        | Optional description                                                         |
| `copies`      | number  | ✅        | Non-negative number of available copies                                      |
| `available`   | boolean | ❌        | Auto-managed based on `copies` (default: `true`)                             |

---

### 📦 Borrow Model

| Field      | Type     | Required | Description                             |
| ---------- | -------- | -------- | --------------------------------------- |
| `book`     | ObjectId | ✅        | Reference to the book being borrowed    |
| `quantity` | number   | ✅        | Number of copies to borrow              |
| `dueDate`  | ISO Date | ✅        | Date by which the book must be returned |

---

## ❌ Error Handling

Example error response for invalid input:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

## 📖 API Documentation

### 1. **Create a Book**

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

---

### 2. **Get All Books**

**GET** `/api/books`

**Query Parameters**:

* `filter` (genre)
* `sortBy` (e.g., `createdAt`)
* `sort` (`asc` or `desc`)
* `limit` (default: 10)

---

### 3. **Get Book by ID**

**GET** `/api/books/:bookId`

---

### 4. **Update a Book**

**PUT** `/api/books/:bookId`

```json
{ "copies": 50 }
```

---

### 5. **Delete a Book**

**DELETE** `/api/books/:bookId`

---

### 6. **Borrow a Book**

**POST** `/api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

> Automatically adjusts available copies and flags availability status.

---

### 7. **Borrowed Books Summary**

**GET** `/api/borrow`

Returns aggregated total borrowed quantity per book.

---

## 🧠 Mongoose Features

* **Validation**: Type safety and business rule enforcement.
* **Static Methods**: Reusable logic like `Book.borrowCopies()`.
* **Middleware**:

  * `pre-save`: Updates book availability
  * `post-save`: Triggers logs or hooks

---

## 🧪 Testing

You can test the API using tools like:

* [Postman](https://www.postman.com/)
* [Thunder Client](https://www.thunderclient.com/)
* `curl`, HTTPie, or other REST clients

---

## 🔐 Security

* Input validation to prevent data corruption
* Uses `.env` to secure database credentials
* Additions like rate-limiting, helmet, CORS, and auth recommended for production

---

## 💸 Monetization Ideas

* **SaaS Platform**: Offer as a subscription for schools/libraries
* **API Monetization**: Charge for high-volume API access
* **Premium Modules**: Advanced analytics, user permissions, overdue tracking
* **Custom Licensing**: Sell to educational or institutional clients

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a pull request

Please include detailed descriptions with your PRs.

---

## 📈 Future Roadmap

* ✅ Add authentication and user roles
* ⏳ QR/barcode scan integration
* ⏳ Email reminders for due dates
* ⏳ Admin dashboard with charts & stats
* ⏳ Docker support for containerized deployments

---

## 📝 License

Licensed under the [MIT License](LICENSE).

---