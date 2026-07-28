import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

function CoursesTable({
    courses,
    deleteCourse,
    viewCourse,

}) {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <table className="w-full">

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
                                            onClick={() => viewCourse(course)}
                                            className="text-gray-500 hover:text-blue-600"
                                        >
                                            <FiEye size={18} />
                                        </button>

                                        <button className="text-gray-500 hover:text-green-600">
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

    );

}

export default CoursesTable;