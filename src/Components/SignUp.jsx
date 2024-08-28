import { useState, useContext} from "react";
import { useSignupHook } from "../AppHooks/useSignupHook";
import { AuthContext } from "../Context/AuthContext";

const Signup = () => {
    const [step, setStep] = useState("step1");
    let {setAuth} = useContext(AuthContext);

    return (
            <div className="flex h-[550px] md:h-[600px] p-2 flex-col items-center justify-center border">
                <h1 className="text-3xl font-extrabold block md:hidden text-center text-green-600">
                    Achieve Your Dreams
                </h1>
                <h1 className="text-3xl font-extrabold text-center text-green-600 mb-6">SIGN UP</h1>
                {step === "step1" && <Step1 setStep={setStep} />}
                {step === "step2" && <Step2 setStep={setStep} />}
                <div className="flex gap-2 mt-2">
                    <p>Already have an Account?</p>
                    <p onClick={() => {setAuth(true)}} className="text-green-600 cursor-pointer font-medium hover:underline">Login</p>
                </div>
            </div>
    );
};

const Step1 = ({ setStep }) => {
    const { formData, setFormData } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        
        const { firstName, lastName, email, phoneNumber } = formData;
        
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !phoneNumber.trim()) {
            alert("Please fill out all required fields.");
            return;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phoneNumber)) {
            alert("Please enter a valid phone number.");
            return;
        }
        console.log(formData);
        // Proceed to next step
        setStep("step2");
    };
    

    return (
        <form className="w-full md:w-96 flex justify-center gap-3 flex-col">
            <input
                className="border w-80 md:w-full bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName || ""}
                onChange={handleChange}
                required
            />
            <input
                className="border w-80 md:w-full bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName || ""}
                onChange={handleChange}
                required
            />
            <input
                className="border w-80 md:w-full bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
                required
            />
            <input
                className="border w-80 md:w-full bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                required
            />
            <input
                className="border w-80 md:w-full bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                type="file"
                name="resume"
                accept="application/pdf"
                onChange={(e) => {
                    const file = e.target.files[0];
                    setFormData(prev => ({ ...prev, resume: file }));
                }}
            />
            <button
                onClick={handleNext}
                type="submit"
                className="bg-green-500 py-2 rounded-md text-white font-medium"
            >
                NEXT
            </button>
        </form>
    );
};

const Step2 = ({ setStep }) => {
    const { formData, setFormData } = useContext(AuthContext);
    let {error,loading,signup} = useSignupHook();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <form className="w-full md:w-96 flex justify-center gap-3 flex-col" onSubmit={handleSubmit}>
            <input
                className="border w-80 md:w-full bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                type="text"
                name="username"
                placeholder="User Name"
                value={formData.username || ""}
                onChange={handleChange}
                required
            />
            <input
                className="border w-80 md:w-full bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password || ""}
                onChange={handleChange}
                required
            />
            <input
                className="border w-80 md:w-full bg-gray-100 text-[18px] font-mono border-l-8 border-y-0 border-r-0 border-green-500 p-2 pl-4"
                type="password"
                name="confirmPassword"
                placeholder="Re-Enter Password"
                value={formData.confirmPassword || ""}
                onChange={handleChange}
                required
            />
            <div className="flex gap-2">
                <button
                    className="bg-red-500 py-2 grow rounded-md text-white font-medium"
                    onClick={(e) => {
                        e.preventDefault();
                        setStep("step1");
                    }}
                >
                    PREVIOUS
                </button>
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-green-500 py-2 grow rounded-md text-white font-medium"
                >
                    SUBMIT
                </button>
            </div>
            {error && <div className="bg-red-400 text-center p-2 rounded-md">{error}</div> }
        </form>
    );
};

export default Signup;
