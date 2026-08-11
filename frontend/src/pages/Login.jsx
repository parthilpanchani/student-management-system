import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../ui/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            localStorage.setItem("token", response.data.token);

            navigate("/dashboard", { replace: true });

        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    }
    function handleChange(event) {

        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError("");

    }
    return (
        <AuthLayout>

            <form onSubmit={handleLogin}>

                <Input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br />
                <br />

                <Input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br />
                <br />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button type="submit">
                    Login
                </Button>
                <p>Don't have an account? <Link
                    to="/register">Sign up</Link></p>
                  
    <Link
        to="/forgot-password"
        className="text-blue-600 hover:underline text-sm"
    >
        Forgot Password?
    </Link>

            </form>
        </AuthLayout>

    );

}

export default Login;