import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CoursesFilter from "../components/CoursesFilter";
import CoursesTable from "../components/CoursesTable";
import Pagination from "../components/Pagination";
import axios from "axios";


function Courses() {
    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCourses, setTotalCourses] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");

    async function fetchCourses() {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:5000/api/auth/courses?page=${page}&limit=5&search=${search}&status=${selectedStatus}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCourses(response.data.courses);
            setTotalPages(response.data.totalPages);
            setTotalCourses(response.data.totalCourses);

        } catch (error) {

            console.log(error);

        }

    }
    useEffect(() => {
        fetchCourses();
    }, [search, page, selectedStatus]);

    useEffect(() => {
        setPage(1);
    }, [search, selectedStatus]);

    async function deleteCourse(id) {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/auth/courses/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchCourses();

        } catch (error) {

            console.log(error);

        }

    }

    return (
        <div>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-5xl font-bold text-gray-900">
                        Courses
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        Manage and organize all available courses.
                    </p>

                </div>

                <Link
                    to="/add-course"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                    + Add New Course
                </Link>

            </div>

            <CoursesFilter
                search={search}
                setSearch={setSearch}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
            />

            <CoursesTable
                courses={courses}
                deleteCourse={deleteCourse}
            />
            


            <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                startStudent={(page - 1) * 5 + 1}
                endStudent={Math.min(page * 5, totalCourses)}
                totalStudents={totalCourses}
            />

        </div>
    );
}

export default Courses;