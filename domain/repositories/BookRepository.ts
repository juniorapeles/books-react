import { Book } from "@/domain/entities/Book";

export interface BookRepository {
  getAll(): Promise<Book[]>;
  create(book: Omit<Book, "id">): Promise<Book>;
}
