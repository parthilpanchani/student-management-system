import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import {
    FiEye,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";

function TeacherTable({ teachers, deleteTeacher }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    return (
        <>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
<div className="overflow-x-auto rounded-2xl lg:overflow-hidden">
    <table className="w-full min-w-[900px]">
                        <thead className="bg-slate-100 text-xs uppercase text-gray-600">

                            <tr>

                                <th className="text-left px-6 py-4">Teacher</th>
                                <th className="text-left px-6 py-4">Phone</th>
                                <th className="text-left px-6 py-4">Course</th>
                                <th className="text-left px-6 py-4">Experience</th>
                                <th className="text-center px-6 py-4">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {teachers.map((teacher) => (

                                <tr
                                    key={teacher._id}
                                    className="border-t border-gray-100 hover:bg-slate-50 transition"
                                >

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-4">

                                            <img
                                                src="https://placehold.co/50x50"
                                                alt="Teacher"
                                                className="w-12 h-12 rounded-full"
                                            />

                                            <div>

                                                <h3 className="font-semibold text-gray-900">
                                                    {teacher.name}
                                                </h3>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5 text-gray-700">
                                        {teacher.phone}
                                    </td>

                                    <td className="px-6 py-5">

                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {teacher.course?.name}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5 text-gray-700">
                                        {teacher.experience} Years
                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex justify-center items-center gap-5">

                                            <button
                                                onClick={() => {
                                                    setSelectedTeacher(teacher);
                                                    setIsOpen(true);
                                                }}
                                                className="text-gray-500 hover:text-blue-600 transition"
                                            >
                                                <FiEye size={18} />
                                            </button>

                                            <Link
                                                to={`/edit-teacher/${teacher._id}`}
                                                className="text-gray-500 hover:text-green-600 transition"
                                            >
                                                <FiEdit2 size={18} />
                                            </Link>

                                            <button
                                                onClick={() => deleteTeacher(teacher._id)}
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
                className="bg-white w-3/6 rounded-2xl shadow-xl p-8 mx-auto mt-24 relative"
                overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start"
            >

                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-5 text-3xl text-gray-500 hover:text-red-500"
                >
                    ×
                </button>

                {selectedTeacher && (

                    <div>

                        <div className="flex items-center gap-5 mb-8">

                            <img
                                src="https://placehold.co/80"
                                alt="Teacher"
                                className="w-20 h-20 rounded-full"
                            />

                            <div>

                                <h2 className="text-3xl font-bold">
                                    {selectedTeacher.name}
                                </h2>

                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-6">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Phone
                                </p>

                                <p className="font-semibold">
                                    {selectedTeacher.phone}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Experience
                                </p>

                                <p className="font-semibold">
                                    {selectedTeacher.experience} Years
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-gray-500">
                                    Course
                                </p>

                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {selectedTeacher.course?.name}
                                </span>

                            </div>

                        </div>

                    </div>

                )}

            </Modal>

        </>
    );
}

export default TeacherTable;