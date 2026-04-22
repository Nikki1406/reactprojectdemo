import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Books from "../pages/Books";
import CreateBook from "../pages/CreateBook";
import EditBook from "../pages/EditBook";
import ProtectedRoute from "../components/ProtectedRoute";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/books",
    element: (
      <ProtectedRoute>
        <Books />
      </ProtectedRoute>
    ),
  },
  {
    path: "/books/create",
    element: (
      <ProtectedRoute adminOnly>
        <CreateBook />
      </ProtectedRoute>
    ),
  },
  {
    path: "/books/edit/:id",
    element: (
      <ProtectedRoute adminOnly>
        <EditBook />
      </ProtectedRoute>
    ),
  },
]);
export default router;