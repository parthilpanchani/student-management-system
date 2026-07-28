import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
function StudentTable({ students, deleteStudent }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    return (
        <>
            <div className="bg-white shadow-md rounded-xl mt-6 overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left px-6 py-4">Image</th>
                            <th className="text-left px-6 py-4">Name</th>
                            <th className="text-left px-6 py-4">Email</th>
                            <th className="text-left px-6 py-4">Phone</th>
                            <th className="text-left px-6 py-4">Course</th>
                            <th className="text-left px-6 py-4">Age</th>
                            <th className="text-center px-6 py-4">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {students.map((student) => (

                            <tr
                                key={student._id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="px-6 py-4">
                                    <img
                                        src="https://placehold.co/50x50"
                                        alt="Student"
                                        className="w-12 h-12 rounded-full"
                                    />
                                </td>

                                <td className="px-6 py-4">
                                    {student.name}
                                </td>

                                <td className="px-6 py-4">
                                    {student.email}
                                </td>

                                <td className="px-6 py-4">
                                    {student.phone}
                                </td>

                                <td className="px-6 py-4">
                                    {student.course?.name}
                                </td>

                                <td className="px-6 py-4">
                                    {student.age}
                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => {
                                                setSelectedStudent(student);
                                                setIsOpen(true);
                                            }}
                                            className="bg-green-500 text-white px-3 py-2 rounded"
                                        >
                                            View
                                        </button>

                                        <Link
                                            to={`/edit-student/${student._id}`}
                                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                                            Edit
                                        </Link>

                                        <button onClick={() => deleteStudent(student._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded">
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                ariaHideApp={false}
                className="bg-white w-2/3 p-6 rounded-lg shadow-xl mx-auto mt-24 relative"
                overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-2xl font-bold"
                >

                </button>
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-2xl font-bold"
                >
                    ×
                </button>

                {selectedStudent && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">
                            Student Details
                        </h2>

                        <p><strong>Name:</strong> {selectedStudent.name}</p>
                        <p><strong>Email:</strong> {selectedStudent.email}</p>
                        <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                        <p><strong>Age:</strong> {selectedStudent.age}</p>
                        <p><strong>Gender:</strong> {selectedStudent.gender}</p>
                        <p><strong>Course:</strong> {selectedStudent.course?.name}</p>
                    </>
                )}
            </Modal>
        </>

    );
}

export default StudentTable;