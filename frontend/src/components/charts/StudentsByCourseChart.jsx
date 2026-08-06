import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

function StudentsByCourseChart({ data }) {

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">

            <h2 className="text-lg font-semibold mb-4">
                Students by Course
            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="course" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="students"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );

}

export default StudentsByCourseChart;