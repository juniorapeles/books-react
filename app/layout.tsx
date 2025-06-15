import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Library System",
  description: "Manage users, books and loans",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <header className="bg-blue-700 text-white p-4 shadow-md">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link href="/">
              <h1 className="font-bold text-xl cursor-pointer hover:text-blue-300 transition">
                Library System
              </h1>
            </Link>
            <nav className="flex gap-6 text-lg">
              <Link href="/user" className="hover:text-blue-300 transition">
                Users
              </Link>
              <Link href="/book" className="hover:text-blue-300 transition">
                Books
              </Link>
              <Link href="/loan" className="hover:text-blue-300 transition">
                Loans
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow max-w-5xl mx-auto p-6">{children}</main>

        <footer className="bg-blue-700 text-white text-center p-4 mt-auto">
          <p>© {new Date().getFullYear()} Library System. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
