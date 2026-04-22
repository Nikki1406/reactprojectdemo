import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  useEffect(() => {
    api.get(`/books/${id}`)
      .then((res) => setForm({ title: res.data.title, description: res.data.description }))
      .catch(() => setError("Failed to load book"));
  }, [id]);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/books/${id}`, form);
      navigate("/books");
    } catch (err) {
      if (err.response?.status === 403) {
        setError("You don't have permission to edit books.");
      } else {
        setError(err.response?.data || "Failed to update book");
      }
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-lg mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Book</h2>
        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Book title"
            value={form.title}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors resize-none"
          />
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate("/books")}
              className="text-sm text-gray-400 hover:text-gray-600 px-4 py-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-5 py-2 rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditBook;