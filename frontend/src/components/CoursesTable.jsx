import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";

function CoursesTable({
    courses,
    deleteCourse,

}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="overflow-x-auto">
                <table className="min-w-full">

                    <thead className="bg-slate-100 uppercase text-xs text-gray-600">

                        <tr>

                            <th className="text-left px-6 py-4">
                                Course Name
                            </th>

                            <th className="text-left px-6 py-4">
                                Duration
                            </th>

                            <th className="text-left px-6 py-4">
                                Fees
                            </th>

                            <th className="text-left px-6 py-4">
                                Status
                            </th>

                            <th className="text-center px-6 py-4">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {courses.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center py-12 text-gray-500"
                                >

                                    No Courses Found

                                </td>

                            </tr>

                        ) : (

                            courses.map((course) => (

                                <tr
                                    key={course._id}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="px-6 py-5 font-semibold">

                                        {course.name}

                                    </td>

                                    <td className="px-6 py-5">

                                        {course.duration}

                                    </td>

                                    <td className="px-6 py-5">

                                        ₹{course.fees}

                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${course.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {course.status}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex justify-center gap-5">

                                            <button
                                                onClick={() => {
                                                    setSelectedCourse(course);
                                                    setIsModalOpen(true);
                                                }}
                                                className="text-gray-500 hover:text-blue-600"
                                            >
                                                <FiEye size={18} />
                                            </button>

                                            <button onClick={() => navigate(`/edit-course/${course._id}`)}
                                                className="text-gray-500 hover:text-green-600">
                                                <FiEdit2 size={18} />
                                            </button>

                                            <button
                                                onClick={() => {

                                                    if (window.confirm("Are you sure you want to delete this course?")) {

                                                        deleteCourse(course._id);

                                                    }

                                                }}
                                                className="text-gray-500 hover:text-red-600">
                                                <FiTrash2 size={18} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                ariaHideApp={false}
                className="bg-white w-[95%] sm:w-[90%] md:w-[700px] lg:w-[3/5] rounded-2xl shadow-xl p-6 sm:p-8 relative outline-none"
                overlayClassName=" fixed  inset-0  bg-black/50  flex  items-center  justify-center  p-4 z-50 "
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
        </div>

    );

}

export default CoursesTable;