import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                {
                    email,
                }
            );

            alert(response.data.message);

            navigate("/");
        } catch (error) {

            alert(
                error.response?.data?.message || "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">

            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-2 dark:text-white">
                    Forgot Password
                </h1>

                <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                    Enter your email to receive a password reset link.
                </p>

                {message && (
                    <p className="text-green-600 mb-4">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="text-red-600 mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 mb-5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-white font-medium transition ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>

                <div className="text-center mt-6">

                    <Link
                        to="/"
                        className="text-blue-600 hover:underline"
                    >
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;