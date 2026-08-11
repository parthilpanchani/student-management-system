import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

function Navbar({ setIsOpen }) {

    // Get dispatch function
    const dispatch = useDispatch();

    // Read darkMode from Redux
    const darkMode = useSelector(
        (state) => state.theme.darkMode
    );

    // Toggle theme
    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">

            {/* Left */}
            <div className="flex items-center gap-4">

                {/* Mobile Menu */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden text-2xl text-gray-700 dark:text-white"
                >
                    <FiMenu />
                </button>

                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Student Management System
                </h1>

            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

                {/* Theme Button */}
                <button
                    onClick={handleToggleTheme}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    {darkMode ? (
                        <FiSun className="text-xl text-yellow-400" />
                    ) : (
                        <FiMoon className="text-xl text-gray-700 dark:text-white" />
                    )}
                </button>

            </div>

        </header>
    );
}

export default Navbar;