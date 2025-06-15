import { UserRepository } from "@/domain/repositories/UserRepository";
import { User } from "@/domain/entities/User";

export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
}
