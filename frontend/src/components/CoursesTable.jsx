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

    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

            <table className="min-w-full">

                <thead className="bg-slate-100 dark:bg-gray-800 uppercase text-xs text-gray-600 dark:text-gray-300">

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
                                className="text-center py-12 text-gray-500 dark:text-gray-400"
                            >

                                No Courses Found

                            </td>

                        </tr>

                    ) : (

                        courses.map((course) => (

                            <tr
                                key={course._id}
                                className="border-t border-gray-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800 transition"
                            >

                                <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white">

                                    {course.name}

                                </td>

                                <td className="px-6 py-5 text-gray-700 dark:text-gray-300">

                                    {course.duration}

                                </td>

                                <td className="px-6 py-5 text-gray-700 dark:text-gray-300">

                                    ₹{course.fees}

                                </td>

                                <td className="px-6 py-5">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            course.status === "Active"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
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
                                            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                        >
                                            <FiEye size={18} />
                                        </button>

                                        <button
                                            onClick={() => navigate(`/edit-course/${course._id}`)}
                                            className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition"
                                        >
                                            <FiEdit2 size={18} />
                                        </button>

                                        <button
                                            onClick={() => {

                                                if (window.confirm("Are you sure you want to delete this course?")) {

                                                    deleteCourse(course._id);

                                                }

                                            }}
                                            className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
                                        >
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
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-[95%] sm:w-[90%] md:w-[700px] rounded-2xl shadow-xl p-6 sm:p-8 relative outline-none"
            overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >

            <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-5 text-3xl text-gray-500 dark:text-gray-400 hover:text-red-500"
            >
                ×
            </button>

            {selectedCourse && (

                <div>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Course Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Course Name
                            </p>

                            <p className="font-semibold text-gray-900 dark:text-white">
                                {selectedCourse.name}
                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Duration
                            </p>

                            <p className="font-semibold text-gray-900 dark:text-white">
                                {selectedCourse.duration}
                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Fees
                            </p>

                            <p className="font-semibold text-gray-900 dark:text-white">
                                ₹{selectedCourse.fees}
                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Status
                            </p>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    selectedCourse.status === "Active"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
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