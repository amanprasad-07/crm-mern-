import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import CustomerList from "../pages/Customers/CustomerList";
import CustomerDetails from "../pages/Customers/CustomerDetails";
import CustomerEdit from "../pages/Customers/CustomerEdit";
import CustomerCreate from "../pages/Customers/CustomerCreate";

// Centralized routing configuration for the client application.
// Defines all navigable paths and maps each route to its respective page component.
// Unauthorized or undefined paths are redirected to /login for controlled access.
export default function AppRoutes() {
  return (
    <Routes>

      {/* Default route: redirect root access to login page */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Authentication routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer management routes */}
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/customers/new" element={<CustomerCreate />} />
      <Route path="/customers/:id" element={<CustomerDetails />} />
      <Route path="/customers/:id/edit" element={<CustomerEdit />} />

      {/* Fallback: handle unknown paths with safe redirection */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}
