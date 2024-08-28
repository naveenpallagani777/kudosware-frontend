import { useState, useContext } from "react";
import { useLoginHook } from "../AppHooks/useLoginHook";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
    const { formData, setFormData, setAuth } = useContext(AuthContext);
    const { error, loading, login } = useLoginHook();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email: formData.email, password: formData.password });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex grow h-[600px] md:h-[650px] p-3 md:px-10 flex-col items-center justify-center border">
            {loading && <div>LOADING....</div>}
            <h1 className="text-2xl md:text-3xl font-extrabold block lg:hidden text-center text-green-600">
                Achieve Your Dreams
            </h1>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-center text-green-600 mb-6">LOGIN</h1>
            <form className="w-full flex justify-center gap-3 flex-col" onSubmit={handleSubmit}>
                <input
                    className="border bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    required
                />
                <input
                    className="border bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    required
                />
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-green-500 py-2 grow rounded-md text-white font-medium"
                >
                    SUBMIT
                </button>
                {error && <div className="bg-red-400 text-center p-2 rounded-md mt-2">{error}</div>}
            </form>
            <div className="flex gap-2 mt-2">
                <p>Don't have an account?</p>
                <p onClick={() => { setAuth(false); }} className="text-green-600 cursor-pointer font-medium hover:underline">Sign up</p>
            </div>
        </div>
    );
};

export default Login;
