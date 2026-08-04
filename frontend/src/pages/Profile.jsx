import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Modal from "react-modal";

function Profile() {

    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const {
        user,
        setUser,
        profileImage,
        setProfileImage,
    } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isOpen, setIsOpen] = useState(false);
    const openEditModal = () => {

        setFormData({
            name: user.name,
            email: user.email,
        });

        setIsOpen(true);

    };
    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/auth/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(response.data.user);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const fetchProfileImage = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/auth/profile/image",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: "blob",
                }
            );

            const imageURL = URL.createObjectURL(response.data);

            setProfileImage(imageURL);

        } catch (error) {

            if (error.response?.status !== 404) {
                console.log(error);
            }

        }
    };
    const uploadProfileImage = async (file) => {

        try {

            setUploading(true);

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("profileImage", file);

            await axios.put(
                "http://localhost:5000/api/auth/profile/image",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            fetchProfileImage();

            alert("Profile image updated successfully.");

        } catch (error) {
            console.log(error);
        }
        finally {
            setUploading(false);
        }
    };

    const updateProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.put(
                "http://localhost:5000/api/auth/profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser({
                ...user,
                ...response.data.user,
            });
            setIsOpen(false);

            alert("Profile updated successfully");

        } catch (error) {

            console.log(error);

        }

    };

    const changePassword = async () => {

        try {

            if (passwordData.newPassword !== passwordData.confirmPassword) {

                alert("New Password and Confirm Password do not match.");
                return;
            }

            const token = localStorage.getItem("token");

            const response = await axios.put(
                "http://localhost:5000/api/auth/profile/password",
                {
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Something went wrong");

        }

    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        uploadProfileImage(file);

    };

    useEffect(() => {
        ``
        const loadProfile = async () => {
            await Promise.all([
                fetchProfile(),
                fetchProfileImage(),
            ]);

            setLoading(false);
        };

        loadProfile();

    }, []);
    if (loading) {
        return (
            <div className="p-8">
                Loading...
            </div>
        );
    }

    return (

        <div className="p-6">

            <div className="mb-8">

                <h1 className="text-4xl font-bold heading">
                    My Profile
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage your profile information and account settings.
                </p>

            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mt-8">
                <div className="grid md:grid-cols-3 gap-10 items-center">
                    <div className="flex flex-col items-center">

                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-44 h-44 rounded-full object-cover border-4 border-blue-600"
                            />
                        ) : (
                            <div className="w-44 h-44 rounded-full bg-gray-300 flex items-center justify-center text-6xl font-bold">
                                {user?.name?.charAt(0)}
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />

                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-semibold mb-6">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            <div>
                                <p className="subheading">Full Name</p>
                                <p className="font-semibold">{user.name}</p>
                            </div>

                            <div>
                                <p className="subheading">Role</p>
                                <p className="font-semibold capitalize">{user.role}</p>
                            </div>

                            <div>
                                <p className="subheading">Email</p>
                                <p className="font-semibold">{user.email}</p>
                            </div>

                            <div>
                                <p className="subheading">Member Since</p>
                                <p className="font-semibold">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                        </div>

                        <div className="mt-8 space-y-4">

                            <div className="flex">

                                <p className="w-40 text-gray-500">
                                    Account Created
                                </p>

                                <p className="font-semibold">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </p>

                            </div>

                            <div className="flex">

                                <p className="w-40 text-gray-500">
                                    Last Updated
                                </p>

                                <p className="font-semibold">
                                    {new Date(user.updatedAt).toLocaleDateString()}
                                </p>

                            </div>

                        </div>
                       
          <div className=" border-gray-200 mt-10 pt-8">

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                                Change Photo
                            </button>

                            <button
                                onClick={openEditModal}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                            >
                                Edit Profile
                            </button>
</div>
                        </div>

                    </div>
                </div>

            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mt-8">
                <h2 className="text-2xl font-bold mb-6">
                    Change Password
                </h2>

                <div className="space-y-5">

                    <input
                        type="password"
                        placeholder="Current Password"
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                            setPasswordData({
                                ...passwordData,
                                currentPassword: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                            setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                            setPasswordData({
                                ...passwordData,
                                confirmPassword: e.target.value,
                            })
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <button
                        onClick={changePassword}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        Change Password
                    </button>

                </div>

            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                ariaHideApp={false}
                className="bg-white w-[500px] rounded-xl p-8 shadow-xl mx-auto mt-20 relative"
                overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start"
            >

                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-5 text-3xl"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mb-6">
                    Edit Profile
                </h2>

                <div className="space-y-5">

                    <div>

                        <label className="block mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                    <div>

                        <label className="block mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            }
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            onClick={() => setIsOpen(false)}
                            className="border px-5 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={updateProfile}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Save Changes
                        </button>

                    </div>

                </div>

            </Modal>
        </div>

    );

}

export default Profile;