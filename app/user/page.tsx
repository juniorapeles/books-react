"use client";

import { useEffect, useState } from "react";
import { User } from "@/domain/entities/User";
import { UserApi } from "@/infrastructure/api/UserApi";
import { CreateUserUseCase } from "@/application/usecases/CreateUserUseCase";
import { GetUsersUseCase } from "@/application/usecases/GetUsersUseCase";

const userApi = new UserApi();
const createUserUseCase = new CreateUserUseCase(userApi);
const getUsersUseCase = new GetUsersUseCase(userApi);

export default function UserPage() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserUseCase.execute({ username });
      setUsername("");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Error creating user.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchUsers() {
    try {
      const data = await getUsersUseCase.execute();
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching users.");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">User List</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="border px-4 py-2 rounded flex justify-between"
            >
              <div>
                <p className="font-medium">{user.username}</p>
              </div>
              <span className="text-xs text-gray-400">ID: {user.id}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
