import { useEffect, useState } from "react";
import axios from "axios";

function RecentStudents({ students }) {

    return (
        <div className="bg-white shadow-md rounded-xl mt-8 p-6">
            <h2 className="text-2xl font-bold mb-4">
                Recent Students
            </h2>

            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3">Name</th>
                        <th className="text-left py-3">Email</th>
                        <th className="text-left py-3">Course</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student) => (
                        <tr key={student._id} className="border-b">
                            <td className="py-3">{student.name}</td>
                            <td>{student.email}</td>
<td>{student.course?.name}</td>                        
</tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecentStudents;