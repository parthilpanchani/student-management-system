import { Link } from "react-router-dom";
import { FiEye, FiMoreVertical } from "react-icons/fi";
import Card from "../ui/Card";
function RecentStudents({ students }) {
    return (
        <Card className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-8">

            <div className="flex justify-between items-center px-6 py-5">

                <h2 className="text-2xl font-semibold">
                    Recent Students
                </h2>

                <Link
                    to="/students"
                    className="text-blue-600 text-sm font-medium hover:underline"
                >
                    View All Students
                </Link>

            </div>

            <table className="w-full">

                <thead className="bg-slate-100 dark:bg-gray-800 text-xs uppercase text-black dark:text-white">

                    <tr>

                        <th className="text-left px-6 py-4">
                            Student Name
                        </th>

                        <th className="text-left px-6 py-4">
                            Course
                        </th>


                    </tr>

                </thead>

                <tbody>

                    {students.map((student) => (

                        <tr
                            key={student._id}
                            className="border-t border-gray-100 hover:bg-slate-50 transition"
                        >

                            <td className="px-6 py-4">

                                <div className="flex items-center gap-4">

                                    <img
                                        src="https://placehold.co/45"
                                        alt="Student"
                                        className="w-11 h-11 rounded-full"
                                    />

                                    <div>

                                        <h3 className="font-semibold text-gray-800 dark:text-white">
                                            {student.name}
                                        </h3>

                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {student.email}
                                        </p>

                                    </div>

                                </div>

                            </td>
                            <td className="whitespace-nowrap">
                                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                                    {student.course?.name}
                                </span>

                            </td>



                        </tr>

                    ))}

                </tbody>

            </table>

        </Card>
    );
}

export default RecentStudents;