import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import {
    FiEye,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
function StudentTable({ students, deleteStudent }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    return (
        <>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden transition-colors duration-300 mt-10">
                <div className="overflow-x-auto rounded-2xl lg:overflow-hidden">
                    <table className="w-full min-w-[900px]">

                        <thead className="bg-slate-100 text-xs uppercase text-gray-600">

                            <tr>

                                <th className="text-left px-6 py-4">Student</th>
                                <th className="text-left px-6 py-4 hidden md:table-cell">Phone</th>
                                <th className="text-left px-6 py-4">Course</th>
                                <th className="text-left px-6 py-4">Gender</th>
                                <th className="text-center px-6 py-4">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {students.map((student) => (

                                <tr
                                    key={student._id}
                                    className="border-t border-gray-100 hover:bg-slate-50 transition"
                                >

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-4">

                                            <img
                                                src="https://placehold.co/50x50"
                                                alt="Student"
                                                className="w-12 h-12 rounded-full"
                                            />

                                            <div>

                                                <h3 className="font-semibold text-gray-900">
                                                    {student.name}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {student.email}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5 text-gray-700 hidden md:table-cell">
                                        {student.phone}
                                    </td>

                                    <td className="px-6 py-5">

                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {student.course?.name}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5 text-gray-700 capitalize">
                                        {student.gender}
                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex justify-center items-center gap-5">

                                            <button
                                                onClick={() => {
                                                    setSelectedStudent(student);
                                                    setIsOpen(true);
                                                }}
                                                className="text-gray-500 hover:text-blue-600 transition"
                                            >
                                                <FiEye size={18} />
                                            </button>

                                            <Link
                                                to={`/edit-student/${student._id}`}
                                                className="text-gray-500 hover:text-green-600 transition"
                                            >
                                                <FiEdit2 size={18} />
                                            </Link>

                                            <button
                                                onClick={() => deleteStudent(student._id)}
                                                className="text-gray-500 hover:text-red-600 transition"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>

            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                ariaHideApp={false}
                className="bg-white w-[95%] sm:w-[90%] md:w-[650px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6 md:p-8 relative mx-auto mt-8 md:mt-20"
                overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-red-500"
                >
                    ×
                </button>

                {selectedStudent && (
                    <>
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8">

                            <img
                                src="https://placehold.co/100"
                                alt="Student"
                                className="w-24 h-24 rounded-full object-cover"
                            />

                            <div className="text-center sm:text-left">

                                <h2 className="text-2xl md:text-3xl font-bold break-words">
                                    {selectedStudent.name}
                                </h2>

                                <p className="text-gray-500 break-all">
                                    {selectedStudent.email}
                                </p>

                            </div>

                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-semibold">
                                    {selectedStudent.phone}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="font-semibold">
                                    {selectedStudent.age}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Gender</p>
                                <p className="font-semibold capitalize">
                                    {selectedStudent.gender}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Course</p>

                                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mt-1">
                                    {selectedStudent.course?.name}
                                </span>
                            </div>

                        </div>

                    </>
                )}
            </Modal>

        </>
    );
}
export default StudentTable;