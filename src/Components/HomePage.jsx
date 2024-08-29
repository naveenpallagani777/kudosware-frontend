import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";

const HomePage = () => {
    const { user,setUser } = useContext(AuthContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        
    }, [user]);

    const haandleViewResume = () => {
        try {

            if (!user || !user.resume || !Array.isArray(user.resume.data?.data)) {
                throw new Error("Invalid resume data format");
            }

            // Convert the resume.data array to a Uint8Array
            const byteArray = new Uint8Array(user.resume.data.data);

            // Create a Blob from the Uint8Array
            const blob = new Blob([byteArray], { type: user.resume.contentType });

            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);

            // Open the PDF in a new tab or download it
            window.open(url, '_blank');
            
        } catch (err) {
            console.error("Error converting PDF data: ", err);
            setError("Failed to load resume. Please try again later.");
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('user'); 
        setUser(null);
    }

    return (<div className="h-screen justify-center flex items-center p-2">
            <header className="bg-green-700 text-white px-9 md:px-0 py-4 w-full fixed left-0 top-0">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold hidden md:block">Achieve Your Dreams</h1>
                    <h1 className="text-2xl font-bold md:hidden block">AYD</h1>
                    <nav className="flex gap-3">
                        <ul className="hidden space-x-4  md:flex">
                            <li><a href="#" className="hover:text-gray-400">Home</a></li>
                            <li><a href="#" className="hover:text-gray-400">About</a></li>
                            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                            
                        </ul>
                        <button 
                            className="hover:text-gray-200" 
                            onClick={logoutHandler}
                        >Logout</button>
                    </nav>
                </div>
            </header>
            <div className="flex flex-col p-1.5 gap-3 md:p-5 border rounded-md">
                <div className="flex flex-wrap justify-center items-center gap-2">
                    <img className="w-52 boreder" src="/images/profile.png" alt="Profile Picture" />
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <div className="p-1 md:p-4">
                            <table className="min-w-full border-collapse border border-gray-200">
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-2 font-semibold">First Name</td>
                                        <td className="border border-gray-300 p-2">{user.firstName}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2 font-semibold">Last Name</td>
                                        <td className="border border-gray-300 p-2">{user.lastName}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2 font-semibold">Email</td>
                                        <td className="border border-gray-300 p-2">{user.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <footer className="bg-gray-800 text-white w-full py-2 fixed bottom-0 left-0">
                        <div className="container mx-auto text-center">
                            <p className="mb-2">&copy; 2024 AYD. All rights reserved.</p>
                            <div className="flex justify-center space-x-4">
                            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                            <a href="#" className="hover:text-gray-400">Terms of Service</a>
                            <a href="#" className="hover:text-gray-400">Contact Us</a>
                            </div>
                        </div>
                    </footer>
                </div>
                <button onClick={haandleViewResume} className="bg-blue-500 py-2 px-4 rounded-md flex gap-2 items-center justify-center font-medium">
                        <img src="/images/view.png" className="w-5" alt="" />
                        VIEW RESUME
                </button>
                </div>
        </div>
    );
};

export default HomePage;
