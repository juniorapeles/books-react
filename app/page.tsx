export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Library System</h1>
      <div className="flex gap-4">
        <a href="/user" className="bg-blue-600 text-white px-4 py-2 rounded">Users</a>
        <a href="/book" className="bg-green-600 text-white px-4 py-2 rounded">Books</a>
        <a href="/loan" className="bg-purple-600 text-white px-4 py-2 rounded">Loans</a>
      </div>
    </main>
  );
}