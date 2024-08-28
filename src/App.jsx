import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CoverPage from "./Components/CoverPage";
import HomePage from "./Components/HomePage";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import Login from "./Components/Login";
import Signup1 from "./Components/SignUp1";

function App() {
  const { user,Auth,loadingpage } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/home" />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 px-3 md:px-[12%] lg:px-[6%] border border-black h-screen items-center justify-center">
                {loadingpage && <div className="text-red-700 fixed top-0 left-0 z-10 h-screen w-screen flex items-center justify-center bg-black bg-opacity-60 font-extrabold text-3xl">LOADING...</div>}
                <CoverPage />
                {Auth && <Login />}
                {!Auth && <Signup1 />}
               
              </div>
            )
          }
        />
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
