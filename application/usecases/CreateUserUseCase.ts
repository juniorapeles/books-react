import { UserRepository } from "@/domain/repositories/UserRepository";
import { User } from "@/domain/entities/User";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: Omit<User, "id">): Promise<User> {
    return await this.userRepository.create(user);
  }
}