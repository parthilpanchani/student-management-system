import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };

    const navClass = ({ isActive }) =>
        isActive
            ? "text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600 transition";

    return (
        <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-blue-600">
                Student Management
            </h1>

            {/* Navigation */}
            <div className="flex items-center gap-6">

                <NavLink
                    to="/dashboard"
                    className={navClass}    
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/students"
                    className={navClass}
                >
                    Students
                </NavLink>

                <NavLink
                    to="/teachers"
                    className={navClass}
                >
                    Teachers
                </NavLink>

                <NavLink
                    to="/courses"
                    className={navClass}
                >
                    Courses
                </NavLink>

                <NavLink
                    to="/profile"
                    className={navClass}
                >
                    Profile
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Logout
                </button>

            </div>
        </nav>
    );
}

export default Navbar;