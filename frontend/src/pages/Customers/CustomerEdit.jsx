import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function CustomerEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Protect route by checking if a valid user token exists in local storage.
    // Redirect to login if unauthorized.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) navigate("/login");
    }, []);

    // Holds the editable customer fields pulled from backend.
    const [formData, setFormData] = useState(null);

    // Fetch existing customer data for editing and populate form state.
    useEffect(() => {
        axiosInstance.get(`/customers/${id}`).then((res) => {
            setFormData(res.data.data);
        });
    }, [id]);

    // Show a loading placeholder until customer data is available.
    if (!formData) return <p className="p-6">Loading...</p>;

    // Submit updated customer data back to server.
    // On success, redirect back to the customer's detail view.
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosInstance.put(`/customers/${id}`, formData);
        navigate(`/customers/${id}`);
    };

    return (
        // Main content wrapper with consistent styling across pages.
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">

                {/* Page title */}
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Edit Customer
                </h1>

                {/* Render edit form when data is ready */}
                {!formData ? (
                    <p className="text-center text-gray-600 py-10">Loading...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name input */}
                        <input
                            name="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white
                     focus:ring-2 focus:ring-green-400 focus:border-green-400 
                     outline-none transition-all"
                            placeholder="Customer Name"
                        />

                        {/* Email input */}
                        <input
                            name="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white
                     focus:ring-2 focus:ring-green-400 focus:border-green-400 
                     outline-none transition-all"
                            placeholder="Email"
                        />

                        {/* Phone input */}
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white
                     focus:ring-2 focus:ring-green-400 focus:border-green-400 
                     outline-none transition-all"
                            placeholder="Phone"
                        />

                        {/* Address input */}
                        <input
                            name="address"
                            value={formData.address}
                            onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                            }
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white
                     focus:ring-2 focus:ring-green-400 focus:border-green-400 
                     outline-none transition-all"
                            placeholder="Address"
                        />

                        {/* Notes input */}
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData({ ...formData, notes: e.target.value })
                            }
                            className="w-full border border-gray-300 px-4 py-3 h-28 rounded-lg bg-white
                     focus:ring-2 focus:ring-green-400 focus:border-green-400 
                     outline-none transition-all"
                            placeholder="Notes"
                        />

                        {/* Submit button */}
                        <button
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg 
                     font-medium shadow-md hover:shadow-lg transition-all"
                        >
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>

    );
}
