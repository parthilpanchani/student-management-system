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

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/students" element={<Students />} />

          <Route path="/add-student" element={<AddStudent />} />

          <Route path="/edit-student/:id" element={<AddStudent />}
/>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;