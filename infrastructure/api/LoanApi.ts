import axios from "axios";
import { Loan } from "@/domain/entities/Loan";
import { LoanRepository } from "@/domain/repositories/LoanRepository";

const api = axios.create({
  baseURL: "https://api.v1.juniorapeles.xyz",
});

export class LoanApi implements LoanRepository {
  async getAll(): Promise<Loan[]> {
    const response = await api.get<Loan[]>("/loans");
    return response.data;
  }

  async create(loan: { bookId: number; userId: number }): Promise<Loan> {
    // O backend espera o LoanDTO com book e user aninhados, só enviamos id's
    const response = await api.post<Loan>("/loans", {
      book: { id: loan.bookId },
      user: { id: loan.userId },
    });
    return response.data;
  }
}
