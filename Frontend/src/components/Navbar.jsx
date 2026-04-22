import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";
  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } catch {}
    logout();
    navigate("/login");
  }
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between">
      <Link to="/dashboard" className="text-xl font-semibold text-indigo-600 tracking-tight">
        BookShelf
      </Link>
      <div className="flex items-center gap-4 sm:gap-6">
        <Link to="/books" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
          Books
        </Link>
        {isAdmin && (
          <Link to="/books/create" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
            Add Book
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="text-sm text-white bg-indigo-500 hover:bg-indigo-600 transition-colors px-4 py-1.5 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
export default Navbar;