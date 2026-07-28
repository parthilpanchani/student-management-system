import { Link } from "react-router-dom";
import Input from "./Input";
import { useState, useEffect } from "react";
import axios from "axios";

function StudentFilter({ search, setSearch, selectedCourse, setSelectedCourse, selectedGender,
    setSelectedGender }) {
    const [courses, setCourses] = useState([]);

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
    return (
        <div className="bg-white shadow-md rounded-xl p-4 mt-6">

            <div className="flex justify-between items-center gap-4">

                <div className="flex gap-4 flex-1">

                    <Input
                        type="text"
                        placeholder="Search Student..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        name="course"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2" >
                        <option value="">ALL Course</option>

                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2"
                    >
                        <option value="">All Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                </div>


                {/* <Link
                    to="/add-student"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Add Student
                </Link> */}

            </div>

        </div>
    );
}

export default StudentFilter;