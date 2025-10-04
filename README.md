# 📚 Book Review Platform (MERN Stack)

A Fullstack **Book Review Platform** where users can sign up, log in, add books, and write reviews.  
This project demonstrates skills in **MongoDB, Express, React, Node.js (MERN)** with authentication, CRUD operations, and frontend integration.

---

## 🚀 Features

### 🔑 User Authentication

- Register with **Name, Email (unique), Password (hashed)**
- Login with email & password
- JWT-based authentication
- Protected API routes with middleware

### 📖 Book Management

- Add, edit, delete books (only by creator)
- Book fields: _Title, Author, Description, Genre, Published Year_
- All users can view book list
- Pagination: 5 books per page

### ⭐ Review System

- Add reviews with **Rating (1–5 stars) & Text**
- Edit/delete own reviews
- Show all reviews & average rating on book details page

---

## 🛠️ Tech Stack

**Frontend**

- React + React Router
- Context API for state management
- Axios for API calls
- Tailwind CSS for UI

**Backend**

- Node.js + Express
- MongoDB Atlas (Mongoose ODM)
- JWT + bcrypt for auth
- MVC folder structure

---

## 📁 Project Structure

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── jwt.js             # JWT secret
├── controllers/
│   ├── bookController.js  # Book CRUD + Pagination
│   ├── reviewController.js # Review CRUD
│   └── userController.js  # Auth (register/login)
├── middleware/
│   └── authMiddleware.js  # JWT validation
├── models/
│   ├── Book.js            # Book + Review schema
│   └── User.js            # User schema + password hashing
├── routes/
│   ├── bookRoutes.js
│   ├── reviewsRoutes.js
│   └── userRoutes.js
└── server.js              # Express app

frontend/
├── app/
│   ├── addbook/
│   │   └── page.jsx       # Add book form
│   ├── books/
│   │   ├── [bookId]/
│   │   │   └── page.jsx   # Book details + reviews
│   │   └── page.jsx       # Books list + pagination
│   ├── login/
│   │   └── page.jsx       # Login (email + password)
│   └── signup/
│       └── page.jsx       # Signup form
└── components/
    ├── AddReview.jsx      # Add review modal
    ├── EditBook.jsx       # Edit book modal
    ├── EditReview.jsx     # Edit review modal
    └── Navbar.jsx         # Navigation
```
