import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const COLORS = [
    "#2563EB",
    "#EC4899",
    "#10B981"
];

function GenderChart({ data }) {

    return (

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">

            <h2 className="text-lg font-semibold mb-4">
                Gender Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                    >
                        {
                            data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))
                        }
                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default GenderChart;