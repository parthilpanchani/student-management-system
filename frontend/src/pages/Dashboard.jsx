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
        <>
            <h1 className="text-3xl font-bold">
                Welcome Back 👋
            </h1>

            <p className="text-gray-500 mt-2">
                Here's your dashboard overview.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-8">

                <DashboardCard
                    title="Total Students"
                    value={dashboardData.totalStudents}
                />

                <DashboardCard
                    title="Total Teachers"
                    value="10"
                />

                <DashboardCard
                    title="Total Courses"
                 value={dashboardData.totalCourse}
                />

            </div>
                        <RecentStudents students={dashboardData.recentStudents}/>

        </>
    );
}



export default Dashboard;