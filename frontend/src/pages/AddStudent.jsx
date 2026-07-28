import Input from "../components/Input";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddStudent() {
    const { id } = useParams();
const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        course: "",
        age: "",
        gender: ""
    });
    
    const [error, setError] = useState("");
    const [courses, setCourses] = useState([]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,

            [name]: value
        });

    }


    async function handleSubmit(event) {
        event.preventDefault();

        try {

            const token = localStorage.getItem("token");

            let response;

            if (id) {
                response = await axios.put(
                    `http://localhost:5000/api/auth/students/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                response = await axios.post(
                    "http://localhost:5000/api/auth/students",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            setError("");
alert(
    id
        ? "Student updated successfully!"
        : "Student added successfully!"
);

navigate("/students");
if (!id) {
            setFormData({
                name: "",
                email: "",
                phone: "",
                course: "",
                age: "",
                gender: ""
            });
        }
        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);

            setError(error.response?.data?.message || "Something went wrong");
        }

    }
    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://localhost:5000/api/auth/courses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCourses(response.data.courses);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchStudent = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:5000/api/auth/students/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
setFormData({
        name: response.data.student.name,
        email: response.data.student.email,
        phone: response.data.student.phone,
        course: response.data.student.course._id,
        age: response.data.student.age,
        gender: response.data.student.gender,
    });

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (id) {
            fetchStudent();
        }
    }, [id]);

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">

            <h1 className="text-3xl font-bold mb-8">
                {id ? "Edit Student" : "Add Student"}
            </h1>
            {error && (
                <p className="text-red-500">
                    {error}
                </p>
            )}
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <div>
                    <label className="font-medium">
                        Full Name
                    </label>

                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter student name"
                    />
                </div>

                <div>
                    <label className="font-medium">
                        Email
                    </label>

                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />
                </div>

                <div>
                    <label className="font-medium">
                        Phone
                    </label>

                    <Input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                    />
                </div>

                <div>
                    <label className="font-medium">
                        Course
                    </label>
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    >
                        <option value="">Select Course</option>

                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="font-medium">
                        Age
                    </label>

                    <Input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter age"
                    />
                </div>

                <div>

                    <label className="font-medium block mb-3">
                        Gender
                    </label>

                    <div className="flex gap-6">

                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange}
                            />

                            Male

                        </label>

                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleChange}
                            />

                            Female

                        </label>

                    </div>

                </div>

                <Button type="submit">
         {id ? "Update Student" : "Add Student"}
                </Button>

            </form>

        </div>
    );
}
export default AddStudent;