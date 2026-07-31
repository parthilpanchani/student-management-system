import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import RecentStudents from "../components/RecentStudents";
function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    recentStudents: [],
    totalCourse: 0,
    totalTeacher: 0,
    
});

useEffect(() => {
    fetchDashboard();
}, []);

async function fetchDashboard() {
    try {
        
        const token = localStorage.getItem("token");

        const response = await axios.get(
            "http://localhost:5000/api/auth/dashboard",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setDashboardData(response.data);
    } catch (error) {
        console.log(error);
    }
}
return (
    <div>

        {/* Heading */}

        <div className="mb-8">

            <h1 className="text-4xl font-bold text-gray-800">
                Dashboard Overview
            </h1>

            <p className="text-gray-500 mt-2">
                Welcome back, Admin. Here's what's happening today.
            </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <DashboardCard
                title="Total Students"
                value={dashboardData.totalStudents}
                icon="students"
                badge="+12%"
            />

            <DashboardCard
                title="Total Teachers"
                value={dashboardData.totalTeacher}
                icon="teachers"
                badge="Stable"
            />

            <DashboardCard
                title="Total Courses"
                value={dashboardData.totalCourse}
                icon="courses"
                badge="3 Active"
            />

        </div>

        {/* Recent Students */}

        <div className="mt-8">

            <RecentStudents
                students={dashboardData.recentStudents}
            />

        </div>

    </div>
);
}



export default Dashboard;