import { useState, useContext} from "react";
import { useSignupHook } from "../AppHooks/useSignupHook";
import { AuthContext } from "../Context/AuthContext";

const Signup1 = () => {
    let {setAuth} = useContext(AuthContext);
    const { formData, setFormData } = useContext(AuthContext);
    let {error,loading,signup} = useSignupHook();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = formData;

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            alert("Please fill out all required fields.");
            return;
        }

        if (password.trim().length <= 4) {
            alert("Password length should be more than 5 characters.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        signup(formData);
    };

    return (
            <div className="flex grow h-[600px] md:h-[650px] p-3 md:px-10 flex-col items-center justify-center border">
                <h1 className="text-2xl md:text-3xl font-extrabold block lg:hidden text-center text-green-600">
                    Achieve Your Dreams
                </h1>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-center text-green-600 mb-6">SIGN UP</h1>
                <form className="w-full flex justify-center gap-3 flex-col" onSubmit={handleSubmit}>
                    <input
                        className="border  bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName || ""}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="border bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName || ""}
                        onChange={handleChange}
                        required
                    />
                    
                    <input
                        className="border bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                        type="file"
                        name="resume"
                        accept="application/pdf"
                        required
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setFormData(prev => ({ ...prev, resume: file }));
                        }}
                    />
                    <input
                        className="border  bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="border  bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
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
                    {error && <div className="bg-red-400  text-center p-2 rounded-md">{error}</div> }
                </form>
                
                <div className="flex gap-2 mt-2">
                    <p>Already have an Account?</p>
                    <p onClick={() => {setAuth(true)}} className="text-green-600 cursor-pointer font-medium hover:underline">Login</p>
                </div>
            </div>
    );
};


export default Signup1;