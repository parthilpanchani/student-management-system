import Input from "./Input";
import { useState, useEffect } from "react";
import axios from "axios";

function TeacherFilter({
    search,
    setSearch,
    selectedCourse,
    setSelectedCourse,
}) {
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
                        placeholder="Search Teacher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2"
                    >
                        <option value="">All Courses</option>

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

            </div>

        </div>
    );
}

export default TeacherFilter;