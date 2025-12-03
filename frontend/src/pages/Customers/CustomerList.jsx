import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function CustomerList() {
    const navigate = useNavigate();

    // Enforce access control for this route.
    // Redirects to login if the user session is not found in localStorage.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) navigate("/login");
    }, []);

    // Local state: holds the customer dataset and search query string.
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    // Fetch the initial list of all customers from backend.
    useEffect(() => {
        axiosInstance.get("/customers").then((res) => {
            setCustomers(res.data.data);
        });
    }, []);

    // Executes a filtered customer search by passing query to backend API.
    const handleSearch = async (e) => {
        e.preventDefault();
        const res = await axiosInstance.get(`/customers?search=${search}`);
        setCustomers(res.data.data);
    };

    // Clears session state and redirects user to login screen.
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        // Main viewport container with padding and neutral background.
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header section with page title and quick actions */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800">Customers</h1>

                    <div className="flex gap-3">
                        {/* Navigate to create-customer form */}
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg 
                     shadow-md hover:shadow-lg transition-all"
                            onClick={() => navigate("/customers/new")}
                        >
                            + Add Customer
                        </button>

                        {/* Logout action */}
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg
                     shadow-md hover:shadow-lg transition-all"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Search input form */}
                <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search customers..."
                        className="border border-gray-300 w-full px-4 py-3 rounded-lg bg-white
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none
                   transition-all"
                    />

                    <button
                        className="bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg 
                   shadow-sm transition-all"
                    >
                        Search
                    </button>
                </form>

                {/* Customer list display */}
                <div className="space-y-4">
                    {customers.map((c) => (
                        <div
                            key={c._id}
                            className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm 
                     flex justify-between items-center hover:shadow-md transition-all"
                        >
                            {/* Customer summary */}
                            <div>
                                <p className="font-semibold text-gray-800 text-lg">{c.name}</p>
                                <p className="text-sm text-gray-600">{c.email}</p>
                            </div>

                            {/* Action buttons for each customer */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => navigate(`/customers/${c._id}`)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg 
                         transition-all shadow-sm"
                                >
                                    View
                                </button>

                                <button
                                    onClick={() => navigate(`/customers/${c._id}/edit`)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg 
                         transition-all shadow-sm"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    );
}
