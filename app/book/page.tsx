"use client";

import { useEffect, useState } from "react";
import { Book } from "@/domain/entities/Book";
import { BookApi } from "@/infrastructure/api/BookApi";
import { CreateBookUseCase } from "@/application/usecases/CreateBookUseCase";
import { GetBooksUseCase } from "@/application/usecases/GetBooksUseCase";

const bookApi = new BookApi();
const createBookUseCase = new CreateBookUseCase(bookApi);
const getBooksUseCase = new GetBooksUseCase(bookApi);

export default function BookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchBooks() {
    const data = await getBooksUseCase.execute();
    setBooks(data);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createBookUseCase.execute({ title, author });
      setTitle("");
      setAuthor("");
      await fetchBooks();
    } catch (err) {
      alert("Error creating book.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Book List</h2>
      {books.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <ul className="space-y-2">
          {books.map((book) => (
            <li
              key={book.id}
              className="border px-4 py-2 rounded flex justify-between"
            >
              <div>
                <p className="font-medium">{book.title}</p>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
              <span className="text-xs text-gray-400">ID: {book.id}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
