import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import BackButton from "../../components/BackButton";

export default function CustomerCreate() {
    const navigate = useNavigate();

    // Guard route access by validating login state on component mount.
    // Redirect unauthenticated users to login page.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) navigate("/login");
    }, []);

    // Centralized form state for customer creation fields.
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: ""
    });

    const [error, setError] = useState("");

    // Generic change handler for controlled input fields.
    // Updates specific key in the form state using input's name attribute.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit handler for creating a new customer record.
    // Sends payload to backend and redirects to customer list on success.
    // If API returns validation or server errors, surface them to the UI.
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosInstance.post("/customers", formData);
            navigate("/customers");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create customer");
        }
    };

    return (
        // Page layout container with light background and padding.
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <BackButton />
            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">

                {/* Page header */}
                <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                    Add New Customer
                </h1>

                {/* Error state display */}
                {error && (
                    <p className="text-red-600 mb-4 text-center font-medium">
                        {error}
                    </p>
                )}

                {/* Form container */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Customer name input */}
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Customer Name"
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none 
                   transition-all"
                    />

                    {/* Email input */}
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none 
                   transition-all"
                    />

                    {/* Phone input */}
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none 
                   transition-all"
                    />

                    {/* Address input */}
                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none 
                   transition-all"
                    />

                    {/* Notes textarea */}
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Notes"
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white h-28
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none 
                   transition-all"
                    />

                    {/* Submit button */}
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                   font-medium shadow-md hover:shadow-lg transition-all"
                    >
                        Create Customer
                    </button>
                </form>
            </div>
        </div>
    );
}
