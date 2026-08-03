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

        <div className="bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700 rounded-xl p-6 transition-colors duration-300"> 
            <div className="flex justify-between items-center">

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex justify-center items-center">

                    {icons[icon]}

                </div>

                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                    {badge}

                </span>

            </div>

            <p className="text-gray-500 dark:text-gray-400">

                {title}

            </p>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">

                {value}

            </h1>

        </div>

    );
}

export default DashboardCard;