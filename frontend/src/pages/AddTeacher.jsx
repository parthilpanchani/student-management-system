import Input from "../components/Input";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AddTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
    experience: "",
  });

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function fetchCourses() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/auth/courses",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses(res.data.courses);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchTeacher() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/auth/teacher/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFormData({
        name: res.data.teacher.name,
        phone: res.data.teacher.phone,
        course: res.data.teacher.course._id,
        experience: res.data.teacher.experience,
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCourses();
    if (id) fetchTeacher();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (id) {
        await axios.put(
          `http://localhost:5000/api/auth/teacher/${id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Teacher updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/auth/teacher",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Teacher added successfully!");
      }

      navigate("/teacher");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="text-blue-600 text-sm font-medium mb-3">
          Teacher Management / {id ? "Edit Teacher" : "Add New Teacher"}
        </p>

        <h1 className="text-4xl font-bold heading">
          {id ? "Edit Teacher" : "Add Teacher"}
        </h1>

        <p className="text-gray-500 mt-2">
          Please fill out the details below to add a teacher.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-8 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-semibold">Teacher Information</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {error && <p className="text-red-500 mb-5">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter teacher name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Experience (Years)</label>
              <Input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter experience"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number</label>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="border-t border-gray-200 mt-10 pt-8">

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <button
                type="button"
                onClick={() => navigate("/teacher")}
                className="px-8 py-3 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {id ? "Update Teacher" : "Add Teacher"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;