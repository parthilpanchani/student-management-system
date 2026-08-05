import { NavLink, useNavigate } from "react-router-dom";
import {
    FiHome,
    FiUsers,
    FiUser,
    FiBookOpen,
    FiUserCheck,
    FiLogOut,
    FiX,
} from "react-icons/fi";

function Sidebar({ isOpen, setIsOpen }) {

    const navigate = useNavigate();
const role = localStorage.getItem("role");
    const menuClass = ({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        }`;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.setItem("theme", "light");
        navigate("/", { replace: true });
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
        fixed top-0 left-0
        z-50
        h-screen
        w-64
        bg-white
        dark:bg-gray-900
        border-r
        border-gray-200
        dark:border-gray-800
        shadow-md
        flex
        flex-col
        transition-transform
        duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
    `}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-7 pt-8 pb-6">

                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                            Student Management
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Admin Portal
                        </p>
                    </div>

                    <button
                        className="md:hidden text-2xl text-gray-600 dark:text-gray-300"
                        onClick={() => setIsOpen(false)}
                    >
                        <FiX />
                    </button>

                </div>

                {/* Navigation */}
                <nav className="flex-1 px-5">

                    <div className="space-y-2">

                        <NavLink
                            to="/dashboard"
                            className={menuClass}
                            onClick={() => setIsOpen(false)}
                        >
                            <FiHome size={20} />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink
                            to="/students"
                            className={menuClass}
                            onClick={() => setIsOpen(false)}
                        >
                            <FiUsers size={20} />
                            <span>Students</span>
                        </NavLink>

                        
                            <NavLink
                                to="/teacher"
                                className={menuClass}
                                onClick={() => setIsOpen(false)}
                            >
                                <FiUserCheck size={20} />
                                <span>
                                    Add Teacher
                                </span>
                            </NavLink>
                 

                        <NavLink
                            to="/courses"
                            className={menuClass}
                            onClick={() => setIsOpen(false)}
                        >
                            <FiBookOpen size={20} />
                            <span>Courses</span>
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={menuClass}
                            onClick={() => setIsOpen(false)}
                        >
                            <FiUser size={20} />
                            <span>Profile</span>
                        </NavLink>

                    </div>

                </nav>

                {/* Logout */}
                <div className="mt-auto px-5 pb-6">

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 dark:text-red-400  font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                        <FiLogOut size={20} />
                        Logout
                    </button>

                </div>

            </aside>
        </>
    );
}

export default Sidebar;