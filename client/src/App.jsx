import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useState } from "react";
import EmailVerify from "./pages/EmailVerify.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { ToastContainer } from 'react-toastify';

function App() {

  const [dark, setDark] = useState(false);

  const Mode = window.localStorage.getItem("mode");
  useEffect(() => {
    if (Mode == "dark") {
      document.querySelector("html").classList.add("dark");
      setDark(true);
    } else {
      document.querySelector("html").classList.remove("dark");
      setDark(false);
    }
  }, []);

  const modeHandel = () => {
    if (Mode == null) {
      document.querySelector("html").classList.add("dark");
      window.localStorage.setItem("mode", "dark");
      setDark(true);
    } else {
      document.querySelector("html").classList.remove("dark");
      window.localStorage.removeItem("mode");
      setDark(false);
    }
  };

  return (
    <>
      <div className="bg-green-100 dark:bg-gray-800 md:h-[100vh] h-[100%] py-[100px]">
        <ToastContainer/>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/email-verify" element={EmailVerify}/>
            <Route path="/reset-password" element={ResetPassword}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <div>
            <button
              className="absolute bg-black text-xl text-white p-5 dark:text-black dark:bg-white buttom-10 right-10 rounded-full"
              onClick={modeHandel}
            >
              {`${dark ? "light" : "dark"}`}   
            </button>
          </div>
      </div>
    </>
  );
}

export default App;
