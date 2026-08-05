import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourses";
import Teacher from "./pages/Teacher";
import AddTeacher from "./pages/AddTeacher";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (

    <>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/students" element={<Students />} />

            <Route path="/add-student" element={<AddStudent />} />

            <Route path="/edit-student/:id" element={<AddStudent />} />

            <Route path="/courses" element={<Courses />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/edit-course/:id" element={<AddCourse />} />

            <Route path="/teacher" element={<Teacher />} />
            <Route path="/add-teacher" element={<AddTeacher />} />
            <Route path="/edit-teacher/:id" element={<AddTeacher />} />
            <Route path="/profile" element={<Profile />} />

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;