import { User } from "../entities/User";

export interface UserRepository {
  create(user: Omit<User, "id">): Promise<User>;
  getAll(): Promise<User[]>;
}
