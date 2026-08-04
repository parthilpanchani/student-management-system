import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../ui/Card";
import Input from "../ui/Input";
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
    <Card className="p-4 mt-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Search */}
            <div>
                <Input
                    type="text"
                    placeholder="Search Student..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Course */}
            <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-800
                    text-gray-900
                    dark:text-white
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    transition
                "
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

            {/* Gender */}
            <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-800
                    text-gray-900
                    dark:text-white
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    transition
                "
            >
                <option value="">All Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

        </div>

    </Card>
);
}

export default StudentFilter;