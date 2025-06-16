"use client";

import { useEffect, useState } from "react";
import { Book } from "@/domain/entities/Book";
import { BookApi } from "@/infrastructure/api/BookApi";
import { CreateBookUseCase } from "@/application/usecases/CreateBookUseCase";
import { GetBooksUseCase } from "@/application/usecases/GetBooksUseCase";
import { Spinner } from "@/components/Spinner";

const bookApi = new BookApi();
const createBookUseCase = new CreateBookUseCase(bookApi);
const getBooksUseCase = new GetBooksUseCase(bookApi);

export default function BookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const data = await getBooksUseCase.execute();
      setBooks(data);
    } catch {
      setError("Erro ao buscar os livros.");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createBookUseCase.execute({ title, author });
      setTitle("");
      setAuthor("");
      await fetchBooks();
    } catch {
      setError("Erro ao criar o livro.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Spinner message="Carregando livros..." />;
  }

  return (
    <main className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Livros</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Título"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Autor"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar Livro"}
        </button>
      </form>

      {loading && <Spinner message="Salvando livro..." />}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Lista de Livros</h2>

      {books.length === 0 ? (
        <p className="text-gray-500">Nenhum livro cadastrado.</p>
      ) : (
        <ul className="space-y-3">
          {books.map((book) => (
            <li
              key={book.id}
              className="border border-gray-200 px-4 py-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-lg">{book.title}</p>
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
