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

## 📂 Project Structure

/frontend → React frontend (pages, components, context)
/backend → Node.js backend (routes, controllers, models)
/.env → Environment variables (ignored in git)
