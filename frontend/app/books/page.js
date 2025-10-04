"use client";

import { useState, useEffect } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const response = await fetch("/api/books/getbooks");
    const data = await response.json();
    console.log(data);
    setBooks(data);
  };
  console.log(books);
  console.log(books.length);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className="font-sans min-h-screen relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_60rem_at_50%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(60rem_40rem_at_85%_10%,rgba(16,185,129,0.12),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,10,0.6)]" />
      </div>
      <section className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <h1 className="text-6xl font-semibold tracking-tight">Books</h1>
          <p className="mt-2 text-2xl text-zinc-400">
            Discover and manage your favorite books.
          </p>

          <div>
            {/* card for each book */}
            {books.map((book) => (
              <div
                key={book._id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm"
              >
                <h2 className="text-2xl font-semibold">{book.title}</h2>
                <p className="mt-2 text-sm text-zinc-400">{book.author}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href="#add-book"
              className="rounded-md bg-white w-auto h-10 flex px-4 py-2 items-center justify-center text-2xl font-medium text-black hover:bg-gray-200 transition"
            >
              + Add Book
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Books;
