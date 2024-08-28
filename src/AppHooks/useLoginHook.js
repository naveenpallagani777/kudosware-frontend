import { useState,useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


export const useLoginHook = () => {
    let [loading,setLoading] = useState(null);
    let [error,setError] = useState(null);
    let {user,setUser} = useContext(AuthContext);

    const login = async (body) => {
        setError(null);
        setLoading(true);
        try {
            let res = await fetch("http://127.0.0.1:4000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body) 
            });
            let json = await res.json();
            if (res.ok) {
                const userData = { ...json.data, token: json.token };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            }else {
                setError(json.error);
                console.log(json);
            }
        }catch(err) {
            console.log("unable to fetch");
        }finally {
            setLoading(false);
        }
    }

    return {error,loading,login};
}