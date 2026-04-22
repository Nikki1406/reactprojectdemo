import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-3">
          Welcome{user?.username ? `, ${user.username}` : ""}
        </h1>
        <p className="text-gray-400 mb-8">
          {isAdmin ? "You have full access to manage the book collection." : "You can browse the book collection."}
        </p>
        <Link
          to="/books"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
        >
          View Books
        </Link>
      </div>
    </div>
  );
}
export default Dashboard;