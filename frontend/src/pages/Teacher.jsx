import TeacherFilter from "../components/TeacherFilter";
import TeacherTable from "../components/TeacherTable";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Teacher() {
    const [search, setSearch] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState("");

    const fetchTeachers = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:5000/api/auth/teacher?page=${page}&limit=5&search=${search}&course=${selectedCourse}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );
            console.log(response.data);
            setTeachers(response.data.teachers);
            setTotalPages(response.data.totalPages);
            setTotalTeachers(response.data.totalTeachers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, [page, search, selectedCourse]);

    useEffect(() => {
        setPage(1);
    }, [search, selectedCourse]);

    const limit = 5;

    const startTeacher = (page - 1) * limit + 1;

    const endTeacher = Math.min(page * limit, totalTeachers);

    const deleteTeacher = async (id) => {
        try {
            const confirmDelete = window.confirm(
                "Are you sure you want to delete this teacher?"
            );

            if (!confirmDelete) return;

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/auth/teacher/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTeachers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6">

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-3xl md:text-4xl font-bold">
                        Teachers
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Manage and organize teachers across all departments.
                    </p>

                </div>

                <Link
                    to="/add-teacher"
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg"
                >
                    + Add New Teacher
                </Link>

            </div>

            {/* Filter */}

            <TeacherFilter
                search={search}
                setSearch={setSearch}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
            />

            {/* Table */}

            <TeacherTable
                teachers={teachers}
                deleteTeacher={deleteTeacher}
            />

            {/* Pagination */}

            <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                startStudent={(page - 1) * 5 + 1}
                endStudent={Math.min(page * 5, totalTeachers)}
                totalStudents={totalTeachers}
            />

        </div>
    );
}

export default Teacher;