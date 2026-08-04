import StudentFilter from "../components/StudentFilter";
import StudentTable from "../components/StudentTable";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";


function Students() {
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalStudents, setTotalStudents] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    async function fetchStudents() {
        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:5000/api/auth/students?page=${page}&limit=5&search=${search}&course=${selectedCourse}&gender=${selectedGender}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(response.data);
            // console.log("Current Page:", page);
            // console.log("Total Pages:", response.data.totalPages);
            setStudents(response.data.students);
            setTotalPages(response.data.totalPages);
            setTotalStudents(response.data.totalStudents);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchStudents();
    }, [search, page, selectedCourse, selectedGender]);
    useEffect(() => {
        setPage(1);
    }, [search, selectedCourse, selectedGender]);

    const limit = 5;

    const startStudent = (page - 1) * limit + 1;

    const endStudent = Math.min(page * limit, totalStudents);

    const deleteStudent = async (id) => {
        try {
            const confirmDelete = window.confirm(
                "Are you sure you want to delete this student?"
            );

            if (!confirmDelete) return;

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/auth/students/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchStudents();

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="p-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

    <div>
        <h1 className="text-3xl md:text-4xl font-bold">
            Students
        </h1>

        <p className="text-gray-500 mt-2">
            Manage and organize student enrollments.
        </p>
    </div>

    <Link to="/add-student" className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg">
        + Add Student
    </Link>

</div>
            <StudentFilter
                search={search}
                setSearch={setSearch}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
            />

            <StudentTable
                students={students}
                deleteStudent={deleteStudent}
            />

            <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                startStudent={startStudent}
                endStudent={endStudent}
                totalStudents={totalStudents}

            />

        </div>
    );
}

export default Students;