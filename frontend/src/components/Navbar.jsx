import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

function Navbar({ setIsOpen }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16 px-4 md:px-6 flex items-center justify-between transition-colors">

            {/* Left */}
            <div className="flex items-center gap-4">

                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden text-2xl"
                >
                    <FiMenu />
                </button>

                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Student Management System
                </h1>

            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

                <button
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    {theme === "light" ? (
                        <FiMoon className="text-xl text-gray-700 dark:text-white" />
                    ) : (
                        <FiSun className="text-xl text-yellow-400" />
                    )}
                </button>

            </div>

        </header>
    );
}

export default Navbar;