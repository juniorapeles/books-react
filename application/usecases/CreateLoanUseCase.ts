import { Loan } from "@/domain/entities/Loan";
import { LoanRepository } from "@/domain/repositories/LoanRepository";

export class CreateLoanUseCase {
  constructor(private repository: LoanRepository) {}

  async execute(loan: { bookId: number; userId: number }): Promise<Loan> {
    return this.repository.create(loan);
  }
}
