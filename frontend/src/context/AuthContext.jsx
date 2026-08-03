import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState("");

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                profileImage,
                setProfileImage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);