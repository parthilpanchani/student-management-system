import {
    FiUsers,
    FiUserCheck,
    FiBookOpen,
} from "react-icons/fi";

function DashboardCard({
    title,
    value,
    badge,
    icon,
}) {

    const icons = {
        students: <FiUsers size={22} />,
        teachers: <FiUserCheck size={22} />,
        courses: <FiBookOpen size={22} />,
    };

    return (

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-center">

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex justify-center items-center">

                    {icons[icon]}

                </div>

                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                    {badge}

                </span>

            </div>

            <p className="uppercase text-xs tracking-wider text-gray-500 mt-6">

                {title}

            </p>

            <h1 className="text-5xl font-bold text-gray-900 mt-2">

                {value}

            </h1>

        </div>

    );
}

export default DashboardCard;