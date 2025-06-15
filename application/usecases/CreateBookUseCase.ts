import { Book } from "@/domain/entities/Book";
import { BookRepository } from "@/domain/repositories/BookRepository";

export class CreateBookUseCase {
  constructor(private repository: BookRepository) {}

  async execute(book: Omit<Book, "id">): Promise<Book> {
    return this.repository.create(book);
  }
}
