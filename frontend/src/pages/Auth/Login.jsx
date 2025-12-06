import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // Local component state for form fields and error handling.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handles form submission and authentication request.
  // On success, persists user data to localStorage and redirects to customer dashboard.
  // On failure, captures API error and displays a user-friendly message.
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });

      // Store authenticated user details locally for session persistence.
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to main application area.
      navigate("/customers");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    // Full-screen centered layout with subtle gradient background.
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-50 to-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl w-96 border border-gray-200"
      >
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Login
        </h1>

        {/* Email input field */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 w-full px-4 py-3 mb-4 rounded-lg 
                     focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none 
                     transition-all bg-white"
          placeholder="Email"
          type="email"
        />

        {/* Password input field */}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 w-full px-4 py-3 mb-6 rounded-lg 
                     focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none 
                     transition-all bg-white"
          placeholder="Password"
          type="password"
        />

        {/* Submit button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                     font-medium transition-all shadow-md hover:shadow-lg"
        >
          Login
        </button>

        {/* Simple redirect to registration flow */}
        <p
          className="mt-5 text-sm text-blue-700 hover:underline cursor-pointer text-center 
                     transition-all"
          onClick={() => navigate("/register")}
        >
          Create account
        </p>
      </form>
    </div>
  );
}
