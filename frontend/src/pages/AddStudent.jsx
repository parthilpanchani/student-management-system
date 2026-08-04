import Input from "../ui/Input";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
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
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
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

            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("course", formData.course);
            data.append("age", formData.age);
            data.append("gender", formData.gender);

            if (image) {
                data.append("profileImage", image);
            }

            let response;

            if (id) {

                response = await axios.put(
                    `http://localhost:5000/api/auth/students/${id}`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

            } else {

                response = await axios.post(
                    "http://localhost:5000/api/auth/students",
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
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

        } catch (error) {

            console.log(error.response?.data);

            setError(
                error.response?.data?.message || "Something went wrong"
            );

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
    name: response.data.student?.name || "",
    email: response.data.student?.email || "",
    phone: response.data.student?.phone || "",
    course: response.data.student?.course?._id || "",
    age: response.data.student?.age || "",
    gender: response.data.student?.gender || "",
});

            if (response.data.student.profileImage) {
                setPreview(response.data.student.profileImage);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };
    useEffect(() => {
        if (id) {
            fetchStudent();
        }
    }, [id]);
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-8">

                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
                    Student Management / {id ? "Edit Student" : "Add New Student"}
                </p>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {id ? "Edit Student" : "Registration"}
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Please fill out the details below to enroll a new student into the academy database.
                </p>

            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">

                <div className="bg-slate-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8 py-5 border-b border-gray-200 dark:border-gray-700">

                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Student Information
                    </h2>

                </div>

                <form
                    className="p-4 sm:p-6 lg:p-8"
                    onSubmit={handleSubmit}
                >

                    {error && (
                        <p className="text-red-500 mb-6">
                            {error}
                        </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 flex justify-center mb-2">

                            <div className="relative">

                                <img
                                    src={
                                        preview ||
                                        "https://placehold.co/160x160?text=Photo"
                                    }
                                    alt="Student"
                                    className="w-36 h-36 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 shadow-md"
                                />

                                <label
                                    htmlFor="studentImage"
                                    className="absolute bottom-1 right-1 w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer shadow-lg transition"
                                >
                                    <FiEdit2 size={18} />
                                </label>

                                <input
                                    id="studentImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                            </div>

                        </div>
                        <div>

                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>

                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>

                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Phone Number
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

                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                Course Selection
                            </label>

                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 outline-none focus:border-blue-600"
                            >

                                <option value="">
                                    Select Course
                                </option>

                                {courses.map((course) => (

                                    <option
                                        key={course._id}
                                        value={course._id}
                                    >
                                        {course.name}
                                    </option>

                                ))}

                            </select>

                        </div>

                        <div>

                            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
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

                            <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                Gender
                            </label>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">

                                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">

                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === "male"}
                                        onChange={handleChange}
                                    />

                                    Male

                                </label>

                                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">

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

                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-8">

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">

                            <button
                                type="button"
                                onClick={() => navigate("/students")}
                                className="px-8 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition"
                            >
                                {id ? "Update Student" : "Submit Registration"}
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    );
}
export default AddStudent;