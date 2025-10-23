# 📚 Book Review Platform (MERN Stack)

A Fullstack **Book Review Platform** where users can sign up, log in, add books, and write reviews.  
This project demonstrates skills in **MongoDB, Express, React, Node.js (MERN)** with authentication, CRUD operations, and frontend integration.

---

## Live Demo

### Varcel: https://logiksutra-ai-submission.vercel.app/

### Render: https://logiksutraai-backend.onrender.com

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

---

## 🚀 Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/pikacoder44/Inkspire---Book-Review-Platform.git
cd Inkspire---Book-Review-Platform
```

### 2. Backend Setup

#### Step 1: Navigate to backend directory

```bash
cd backend
```

#### Step 2: Install dependencies

```bash
npm install
```

#### Step 3: Create `.env` file

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/bookReviewDB?retryWrites=true&w=majority

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Server Port
PORT=5000
```

**Note:** Replace `your_username`, `your_password`, and cluster details with your MongoDB Atlas credentials.

#### Step 4: Start the backend server

```bash
npm start
```

The backend server will run on `http://localhost:5000`

**Expected Output:**

```
Server is running on port 5000
MongoDB connected successfully
```

### 3. Frontend Setup

#### Step 1: Open a new terminal and navigate to frontend directory

```bash
cd frontend
```

#### Step 2: Install dependencies

```bash
npm install
```

#### Step 3: Start the development server

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

**Expected Output:**

```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

### 4. Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User

**POST** `/users/register`

**Request Body:**

```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### 2. Login User

**POST** `/users/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Book Endpoints

#### 3. Add Book (Protected)

**POST** `/books/addbook`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic American novel",
  "genre": "Fiction",
  "publishedYear": 1925
}
```

**Response (201):**

```json
{
  "message": "Book added successfully",
  "book": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "genre": "Fiction",
    "publishedYear": 1925,
    "createdBy": "507f1f77bcf86cd799439012",
    "reviews": []
  }
}
```

---

#### 4. Get All Books (with Pagination)

**GET** `/books/getbooks?page=1`

**Query Parameters:**

- `page` (optional): Page number (default: 1, 5 books per page)

**Response (200):**

```json
{
  "books": [...],
  "currentPage": 1,
  "totalPages": 3,
  "totalBooks": 12
}
```

---

#### 5. Get Book by ID

**GET** `/books/:bookId`

**Response (200):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publishedYear": 1925,
  "reviews": [...]
}
```

---

#### 6. Update Book (Protected - Only Creator)

**PUT** `/books/:bookId`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "title": "The Great Gatsby (Updated)",
  "author": "F. Scott Fitzgerald",
  "description": "An updated description",
  "genre": "Classic Fiction",
  "publishedYear": 1925
}
```

---

#### 7. Delete Book (Protected - Only Creator)

**DELETE** `/books/:bookId`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Response (200):**

```json
{
  "message": "Book deleted successfully"
}
```

---

### Review Endpoints

#### 8. Add Review (Protected)

**POST** `/review/:bookId`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "rating": 5,
  "comment": "This is an amazing book! Highly recommended."
}
```

**Response (201):**

```json
{
  "message": "Review added successfully",
  "review": {
    "_id": "507f1f77bcf86cd799439013",
    "user": "507f1f77bcf86cd799439012",
    "rating": 5,
    "comment": "This is an amazing book! Highly recommended."
  }
}
```

---

#### 9. Get All Reviews for a Book

**GET** `/review/:bookId`

**Response (200):**

```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "user": {
      "username": "John Doe",
      "email": "john@example.com"
    },
    "rating": 5,
    "comment": "Amazing book!"
  }
]
```

---

#### 10. Update Review (Protected - Only Owner)

**PUT** `/review/:bookId/:reviewId`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "rating": 4,
  "comment": "Updated review text"
}
```

---

#### 11. Delete Review (Protected - Only Owner)

**DELETE** `/review/:bookId/:reviewId`

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Response (200):**

```json
{
  "message": "Review deleted"
}
```

---

## 🔐 Authentication Flow

1. **Register** or **Login** to receive JWT token
2. Store the token (frontend stores in `localStorage`)
3. Include token in `Authorization` header for protected routes:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
4. Token is validated by middleware before accessing protected endpoints

---

## 📦 Postman Collection

A Postman collection is included in the repository for easy API testing.

**File:** `Book_Review_Platform.postman_collection.json`

### How to Import:

1. Open Postman
2. Click **Import** button
3. Select the `Book_Review_Platform.postman_collection.json` file
4. The collection will be imported with all endpoints pre-configured

### Using the Collection:

1. **Register a user** using the Register endpoint
2. Copy the `token` from the response
3. Set the token in the collection variables or individual request headers
4. Test all other endpoints with the token

---

## 🌐 Deployed Links

### Frontend (Vercel)

```
https://your-app-name.vercel.app
```

### Backend (Render/Railway)

```
https://your-backend-api.onrender.com/api
```

**Note:** Update these links after deployment

---

## 🧪 Testing the Application

### Manual Testing Steps:

1. **User Registration**

   - Navigate to `/signup`
   - Fill in Name, Email, Password
   - Submit and verify JWT token is received

2. **User Login**

   - Navigate to `/login`
   - Enter Email and Password
   - Verify successful login and redirect to `/books`

3. **Add Book**

   - Click "Add New Book" button
   - Fill in all fields (Title, Author, Genre, Published Year, Description)
   - Submit and verify book appears in the list

4. **View Books**

   - Verify pagination (5 books per page)
   - Check Genre and Published Year badges
   - Verify average rating display

5. **Edit Book**

   - Click 3-dots menu on your own book
   - Select "Edit Book"
   - Modify fields and save
   - Verify changes are reflected

6. **Delete Book**

   - Click 3-dots menu on your own book
   - Select "Delete Book"
   - Confirm deletion
   - Verify book is removed

7. **Add Review**

   - Click "Rate" button or "View Details"
   - Click "Add Review"
   - Select rating (1-5 stars) and write comment
   - Submit and verify review appears

8. **Edit/Delete Review**
   - View your own review
   - Click 3-dots menu on review
   - Edit or delete as needed

---

## 🐛 Troubleshooting

### Common Issues:

**1. MongoDB Connection Error**

```
Solution: Check your MONGODB_URI in .env file
Ensure IP whitelist in MongoDB Atlas includes your IP
```

**2. JWT Token Invalid**

```
Solution: Ensure JWT_SECRET matches between registration and login
Clear localStorage and re-login
```

**3. CORS Error**

```
Solution: Backend has CORS enabled by default
If issues persist, check server.js CORS configuration
```

**4. Port Already in Use**

```
Solution:
Backend: Change PORT in .env file
Frontend: Next.js will auto-assign next available port
```

---

## 📝 Environment Variables

### Backend `.env` Template:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookReviewDB
JWT_SECRET=your_secret_key_minimum_32_characters_long
PORT=5000
```

### Frontend (if needed):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🎯 Key Features Implemented

✅ User Authentication (Register, Login with JWT)  
✅ Password Hashing (bcrypt)  
✅ Book CRUD Operations  
✅ Book Ownership (Only creator can edit/delete)  
✅ Genre & Published Year fields  
✅ Pagination (5 books per page)  
✅ Review System (Add, Edit, Delete)  
✅ Review Ownership (Only author can modify)  
✅ Average Rating Calculation  
✅ Protected API Routes  
✅ Modern Responsive UI  
✅ Form Validation  
✅ Error Handling

---

## 👨‍💻 Developer

**Pika Coder**  
GitHub: [@pikacoder44](https://github.com/pikacoder44)

---

## 📄 License

This project is created for the Inkspire Book Review Platform.

---

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Vercel for frontend deployment
- Render/Railway for backend deployment
- Tailwind CSS for styling
