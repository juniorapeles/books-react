import { Loan } from "@/domain/entities/Loan";

export interface LoanRepository {
  getAll(): Promise<Loan[]>;
  create(loan: { bookId: number; userId: number }): Promise<Loan>;
}
