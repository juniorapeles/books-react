import axios from "axios";
import { Book } from "@/domain/entities/Book";
import { BookRepository } from "@/domain/repositories/BookRepository";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export class BookApi implements BookRepository {
  async getAll(): Promise<Book[]> {
    const response = await api.get<Book[]>("/books");
    return response.data;
  }

  async create(book: Omit<Book, "id">): Promise<Book> {
    const response = await api.post<Book>("/books", book);
    return response.data;
  }
}