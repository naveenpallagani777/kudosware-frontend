import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        email: ""
    });

    const [user, setUser] = useState(null);
    const [Auth, setAuth] = useState(false);
    let [loadingpage,setLoadingpage] = useState(false);

    useEffect(() => {
        // Load user data from local storage on initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    console.log(user);

    return (
        <AuthContext.Provider value={{ formData, setFormData, user, setUser, Auth, setAuth,loadingpage, setLoadingpage}}>
            {children}
        </AuthContext.Provider>
    );
};
