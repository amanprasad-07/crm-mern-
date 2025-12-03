import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // Local state for form inputs and error messaging.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handles new-user registration.
  // Sends form data to the API; on success, routes user back to login.
  // Any validation or server errors are surfaced as inline messages.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/auth/register", {
        name,
        email,
        password
      });

      // Navigate to login after successful registration.
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    // Full-screen center alignment with soft gradient background.
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-50 to-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl w-96 border border-gray-200 space-y-5"
      >
        {/* Form heading */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Account
        </h2>

        {/* Display registration errors */}
        {error && (
          <p className="text-red-600 text-sm text-center font-medium">
            {error}
          </p>
        )}

        {/* Name field */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white 
                 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none 
                 transition-all"
        />

        {/* Email field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white 
                 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none 
                 transition-all"
        />

        {/* Password field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white 
                 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none 
                 transition-all"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg 
                 font-medium shadow-md hover:shadow-lg transition-all"
        >
          Register
        </button>

        {/* Redirect link to login page */}
        <p
          className="text-center text-sm text-green-700 hover:underline cursor-pointer transition-all"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}
