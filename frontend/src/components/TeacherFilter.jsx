import Input from "../ui/Input";
import { useState, useEffect } from "react";
import axios from "axios";

function TeacherFilter({
    search,
    setSearch,
    selectedCourse,
    setSelectedCourse,
    sort,
    setSort
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
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-4 mt-6">

            <div className="flex flex-col lg:flex-row gap-4">

                {/* Search */}
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Search Teacher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Course Filter */}
                <div className="w-full lg:w-64">
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 outline-none focus:border-blue-600"
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

                {/* Experience Sort */}
                <div className="w-full lg:w-64">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 outline-none focus:border-blue-600"
                    >
                        <option value="">Sort by Experience</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>

            </div>

        </div>
    );
}

export default TeacherFilter;