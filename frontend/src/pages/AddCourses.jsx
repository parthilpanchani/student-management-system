import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function AddCourse() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        duration: "",
        fees: "",
        status: "Active",
    });
    async function fetchCourse() {

        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:5000/api/auth/courses/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setFormData({
                name: response.data.course.name,
                duration: response.data.course.duration,
                fees: response.data.course.fees,
                status: response.data.course.status,
            });
        } catch (error) {

            console.log(error);

        }

    }
    useEffect(() => {

        if (id) {
            fetchCourse();
        }

    }, [id]);

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            if (id) {

                // Update Course

                await axios.put(
                    `http://localhost:5000/api/auth/courses/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                alert("Course Updated Successfully");

            } else {

                // Add Course

                await axios.post(
                    "http://localhost:5000/api/auth/courses",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                alert("Course Added Successfully");

            }

            navigate("/courses");

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Something went wrong");

        }

    }
    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
                <h2 className="text-xl font-semibold mb-6">
                    Course Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Course Name */}
                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Course Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Course Name"
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>
                    {/* Duration */}
                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Duration
                        </label>

                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="Ex. 6 Months"
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>
                    {/* Fees */}
                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Fees
                        </label>

                        <input
                            type="number"
                            name="fees"
                            value={formData.fees}
                            onChange={handleChange}
                            placeholder="Enter Fees"
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>
                    {/* Status */}
                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        >
                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>

                        </select>

                    </div>

                </div>

                <div className="border-t border-gray-200 mt-10 pt-8">

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">

                        <button
                            type="button"
                            onClick={() => navigate("/courses")}
                            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                        >
                            {id ? "Update Course" : "Submit Course"}
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default AddCourse;