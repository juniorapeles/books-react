"use client";

import { useEffect, useState } from "react";
import { Loan } from "@/domain/entities/Loan";
import { Book } from "@/domain/entities/Book";
import { User } from "@/domain/entities/User";
import { LoanApi } from "@/infrastructure/api/LoanApi";
import { BookApi } from "@/infrastructure/api/BookApi";
import { UserApi } from "@/infrastructure/api/UserApi";
import { CreateLoanUseCase } from "@/application/usecases/CreateLoanUseCase";
import { GetLoansUseCase } from "@/application/usecases/GetLoansUseCase";
import { GetBooksUseCase } from "@/application/usecases/GetBooksUseCase";
import { GetUsersUseCase } from "@/application/usecases/GetUsersUseCase";
import { Spinner } from "@/components/Spinner";

const loanApi = new LoanApi();
const bookApi = new BookApi();
const userApi = new UserApi();

const createLoanUseCase = new CreateLoanUseCase(loanApi);
const getLoansUseCase = new GetLoansUseCase(loanApi);
const getBooksUseCase = new GetBooksUseCase(bookApi);
const getUsersUseCase = new GetUsersUseCase(userApi);

export default function LoanPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | undefined>();
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  async function fetchData() {
    try {
      const [loansData, booksData, usersData] = await Promise.all([
        getLoansUseCase.execute(),
        getBooksUseCase.execute(),
        getUsersUseCase.execute(),
      ]);
      setLoans(loansData);
      setBooks(booksData);
      setUsers(usersData);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedBookId || !selectedUserId) {
      alert("Selecione um livro e um usuário.");
      return;
    }
    setLoading(true);
    try {
      await createLoanUseCase.execute({ bookId: selectedBookId, userId: selectedUserId });
      setSelectedBookId(undefined);
      setSelectedUserId(undefined);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Erro ao criar o empréstimo.");
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return <Spinner message="Carregando dados..." />;
  }

  return (
    <main className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Loan Management</h1>

      <form onSubmit={handleSubmit} className="space-y-6 mb-10">
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedBookId ?? ""}
          onChange={(e) => setSelectedBookId(Number(e.target.value))}
          required
          disabled={loading}
        >
          <option value="" disabled className="text-gray-400">
            Select Book
          </option>
          {books.map((book) => (
            <option key={book.id} value={book.id} className="text-gray-900 bg-white">
              {book.title ?? "Unknown Title"}
            </option>
          ))}
        </select>

        <select
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedUserId ?? ""}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
          required
          disabled={loading}
        >
          <option value="" disabled className="text-gray-400">
            Select User
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id} className="text-gray-900 bg-white">
              {user.username ?? "Unknown User"}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Save Loan"}
        </button>
      </form>

      {loading && <Spinner message="Salvando empréstimo..." />}

      <h2 className="text-xl font-semibold mb-4 text-gray-700">Loan List</h2>
      {loans.length === 0 ? (
        <p className="text-gray-500 text-center">No loans found.</p>
      ) : (
        <ul className="space-y-3">
          {loans.map(({ book, user }, i) => (
            <li
              key={i}
              className="border border-gray-300 px-5 py-3 rounded flex justify-between items-center bg-white shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">{book.title ?? "Unknown Title"}</p>
                <p className="text-sm text-gray-500">{book.author ?? "Unknown Author"}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">{user.username ?? "Unknown User"}</p>
                <p className="text-xs text-gray-400">ID: {user.id}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
