import { Loan } from "@/domain/entities/Loan";
import { LoanRepository } from "@/domain/repositories/LoanRepository";

export class GetLoansUseCase {
  constructor(private repository: LoanRepository) {}

  async execute(): Promise<Loan[]> {
    return this.repository.getAll();
  }
}
