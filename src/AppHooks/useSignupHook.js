import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useSignupHook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user, setUser } = useContext(AuthContext);

    const signup = async (body, resumeFile = null) => {
        setError(null);
        setLoading(true);

        try {
            const formData = new FormData();

            // Append user data
            for (const key in body) {
                formData.append(key, body[key]);
            }

            // Append file if available
            if (resumeFile) {
                formData.append('resume', resumeFile);
            }

            const res = await fetch("https://kudosware-backend.onrender.com/api/signup", {
                method: 'POST',
                body: formData // Send form data including file
            });

            const json = await res.json();

            if (res.ok) {
                const userData = { ...json.data, token: json.token };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                setError(json.error || "An error occurred");
            }
        } catch (err) {
            setError("Unable to fetch. Please try again.");
            console.error(err); // Log error details for debugging
        } finally {
            setLoading(false);
        }
    };

    return { error, loading, signup };
};
