import axios from "axios";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { User } from "@/domain/entities/User";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export class UserApi implements UserRepository {
  async create(user: Omit<User, "id">): Promise<User> {
    const response = await api.post<User>("/users", user);
    return response.data;
  }

  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>("/users");
    return response.data;
  }
}