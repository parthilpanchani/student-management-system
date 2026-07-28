function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-blue-600">
                    Student Management
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Welcome to the Student Management System
                </p>

                {children}
            </div>
        </div>
    );
}

export default AuthLayout;