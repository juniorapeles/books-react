import { Book } from "@/domain/entities/Book";
import { BookRepository } from "@/domain/repositories/BookRepository";

export class GetBooksUseCase {
  constructor(private repository: BookRepository) {}

  async execute(): Promise<Book[]> {
    return this.repository.getAll();
  }
}
