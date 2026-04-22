import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "ROLE_ADMIN";
  useEffect(() => {
    api.get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login");
        } else {
          setError("Failed to load books");
        }
      });
  }, []);
  async function handleDelete(id) {
    if (!confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter((b) => b.id !== id));
    } catch {
      setError("Delete failed");
    }
  }
  const filtered = books.filter((b) =>
    String(b.id).includes(search.trim())
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Books</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 transition-colors w-44"
            />
            {isAdmin && (
              <Link
                to="/books/create"
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                + Add Book
              </Link>
            )}
          </div>
        </div>
        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[60vh]">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-16">ID</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-48">Title</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
                  {isAdmin && (
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-28 text-center">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 4 : 3} className="px-5 py-12 text-center text-gray-400">
                      No books found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-500 font-mono">{book.id}</td>
                      <td className="px-5 py-3 text-gray-800 font-medium">{book.title}</td>
                      <td className="px-5 py-3 text-gray-500 max-w-xs truncate">{book.description}</td>
                      {isAdmin && (
                        <td className="px-5 py-3 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <Link
                              to={`/books/edit/${book.id}`}
                              className="text-indigo-500 hover:text-indigo-700 transition-colors font-medium"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="text-red-400 hover:text-red-600 transition-colors font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">{filtered.length} book{filtered.length !== 1 ? "s" : ""} found</p>
      </div>
    </div>
  );
}
export default Books;