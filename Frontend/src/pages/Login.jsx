import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
function Login() {
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      setLoggedIn(res.data);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "ERR_NETWORK" || !err.response) {
        setError("Cannot reach server. Is the backend running on port 8081?");
      } else {
        const msg = err.response?.data;
        setError(typeof msg === "string" ? msg : `Error ${err.response.status}`);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-400 mb-6">Sign in to your account</p>
        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-5">
          No account?{" "}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;