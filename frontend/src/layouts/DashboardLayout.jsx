import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

function DashboardLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex bg-gray-100 dark:bg-gray-950 overflow-hidden transition-colors duration-300">

            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <div className="flex-1 md:ml-64 flex flex-col overflow-hidden">

                <Navbar setIsOpen={setIsSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 text-gray-900 dark:text-gray-100 transition-colors duration-300">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;