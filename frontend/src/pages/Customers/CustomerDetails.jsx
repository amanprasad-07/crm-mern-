import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import BackButton from "../../components/BackButton";

export default function CustomerDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Route guard to prevent unauthorized access.
    // Redirects to login if no authenticated user is found locally.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) navigate("/login");
    }, []);

    // State for storing customer data and controlling UI loading state.
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the specific customer's detail record on initial load.
    // Uses customer ID from URL params.
    useEffect(() => {
        axiosInstance.get(`/customers/${id}`).then((res) => {
            setCustomer(res.data.data);
            setLoading(false);
        });
    }, [id]);

    // Deletes the customer after user confirmation and navigates back to list view.
    const handleDelete = async () => {
        if (!confirm("Delete this customer?")) return;

        await axiosInstance.delete(`/customers/${id}`);
        navigate("/customers");
    };

    // Simple loading placeholder.
    if (loading) return <p className="p-6">Loading...</p>;

    return (
        // Page wrapper with clean spacing and elevated card layout.
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <BackButton/>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6">

                {/* Customer name as header */}
                <h1 className="text-3xl font-semibold text-gray-800">
                    {customer.name}
                </h1>

                {/* Customer information card */}
                <div className="p-6 rounded-lg border border-gray-200 shadow-sm bg-gray-50 space-y-3">

                    <p className="text-gray-700">
                        <span className="font-semibold">Email:</span> {customer.email}
                    </p>

                    <p className="text-gray-700">
                        <span className="font-semibold">Phone:</span> {customer.phone}
                    </p>

                    <p className="text-gray-700">
                        <span className="font-semibold">Address:</span> {customer.address}
                    </p>

                    <p className="text-gray-700">
                        <span className="font-semibold">Notes:</span> {customer.notes || "None"}
                    </p>
                </div>

                {/* Action buttons: Edit and Delete */}
                <div className="flex gap-4 pt-4">
                    <button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg
                   font-medium shadow-md hover:shadow-lg transition-all"
                        onClick={() => navigate(`/customers/${id}/edit`)}
                    >
                        Edit
                    </button>

                    <button
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg
                   font-medium shadow-md hover:shadow-lg transition-all"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>

    );
}
