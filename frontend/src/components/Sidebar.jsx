import { NavLink } from "react-router-dom";
import {
    FiHome,
    FiUsers,
    FiUser,
    FiBookOpen,
    FiUserCheck,
    FiLogOut,
} from "react-icons/fi";
import {useNavigate } from "react-router-dom";
function Sidebar() {
    const menuClass = ({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`;
        const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };

    return (
        <aside className="w-64 h-screen bg-white shadow-md flex flex-col">

            <div className="px-7 pt-8 pb-6">

                <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                    Student Management
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Admin Portal
                </p>

            </div>

            <nav className="flex-1 px-5">

                <div className="space-y-2">

                    <NavLink
                        to="/dashboard"
                        className={menuClass}
                    >
                        <FiHome size={20} />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/students"
                        className={menuClass}
                    >
                        <FiUsers size={20} />
                        <span>Students</span>
                    </NavLink>

                    <NavLink
                        to="/teachers"
                        className={menuClass}
                    >
                        <FiUserCheck size={20} />
                        <span>Teachers</span>
                    </NavLink>

                    <NavLink
                        to="/courses"
                        className={menuClass}
                    >
                        <FiBookOpen size={20} />
                        <span>Courses</span>
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={menuClass}
                    >
                        <FiUser size={20} />
                        <span>Profile</span>
                    </NavLink>

                </div>

            </nav>

            <div className="mt-auto px-5 pb-6">

                <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 font-medium hover:bg-red-50 transition-all">

                    <FiLogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>
    );
}

export default Sidebar;