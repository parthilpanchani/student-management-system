import StudentFilter from "../components/StudentFilter";
import StudentTable from "../components/StudentTable";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useRef } from "react";

function Students() {
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalStudents, setTotalStudents] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    async function fetchStudents() {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }
    const handleImport = async (e) => {

        try {

            const file = e.target.files[0];

            if (!file) return;

            const formData = new FormData();

            formData.append("file", file);

            const token = localStorage.getItem("token");

            const response = await axios.post(

                "http://localhost:5000/api/auth/students/import",

                formData,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            alert(

                `Import Completed

Imported : ${response.data.imported}

Skipped : ${response.data.skipped}`

            );

            fetchStudents();

        } catch (error) {

            console.log(error);

        }

    };
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
    const exportStudents = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/auth/students/export",
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;
            link.download = "students.csv";

            document.body.appendChild(link);

            link.click();

            link.remove();

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
                <div className="flex gap-3">

                    <Link
                        to="/add-student"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Add Student
                    </Link>

                    <button
                        onClick={exportStudents}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        Export CSV
                    </button>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                    >
                        Import CSV
                    </button>

                    <input
                        type="file"
                        accept=".csv"
                        ref={fileInputRef}
                        onChange={handleImport}
                        className="hidden"
                    />
                </div>
            </div>

            <StudentFilter
                search={search}
                setSearch={setSearch}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
            />
            {
                loading ? (
                    <div className="text-center py-20">
                        Loading...
                    </div>
                ) : (
                    <StudentTable
                        students={students}
                        deleteStudent={deleteStudent}
                    />
                )
            }
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