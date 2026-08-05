import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../ui/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
const [error, setError] = useState("");
const token = localStorage.getItem("token");

        if (token) {
            return <Navigate to="/dashboard" replace />;
        }
    async function handleRegister(event) {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                formData
            );
            navigate("/", { replace: true });
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    function handleChange(event) {

            const { name, value } = event.target;
            setFormData({
                ...formData,
                [name]: value,
            });

        }
        return (
                <AuthLayout>

            <form onSubmit={handleRegister}>
                <Input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                 <br />
                <br />
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
                    Register
                </Button>
<p>Don't have an account? <Link
        to="/">Login</Link></p>
            </form>
                    </AuthLayout>

        );

    }

    export default Register;