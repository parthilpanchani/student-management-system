import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CoursesFilter from "../components/CoursesFilter";
import CoursesTable from "../components/CoursesTable";
import Pagination from "../components/Pagination";
import axios from "axios";
import Modal from "react-modal";

function Courses() {
    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCourses, setTotalCourses] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    function viewCourse(course) {

        setSelectedCourse(course);
        setIsModalOpen(true);

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
                viewCourse={viewCourse}
            />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                ariaHideApp={false}
                className="bg-white w-2/3 rounded-2xl shadow-xl p-8 mx-auto mt-24 relative"
                overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start"
            >

                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-5 text-3xl text-gray-500 hover:text-red-500"
                >
                    ×
                </button>

                {selectedCourse && (

                    <div>

                        <div className="flex items-center gap-5 mb-8">


                            <div>

                                {/* <h2 className="text-3xl font-bold">
                        {selectedCourse.name}
                    </h2> */}

                                <p className="text-3xl font-bold">
                                    Course Details
                                </p>

                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-6">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Course Name
                                </p>

                                <p className="font-semibold">
                                    {selectedCourse.name}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Duration
                                </p>

                                <p className="font-semibold">
                                    {selectedCourse.duration}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Fees
                                </p>

                                <p className="font-semibold">
                                    ₹{selectedCourse.fees}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Status
                                </p>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCourse.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {selectedCourse.status}
                                </span>

                            </div>

                        </div>

                    </div>

                )}

            </Modal>


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