import React from "react";
import RegisterForm from "../components/RegisterForm";
import Auth from "../../public/Auth.jpg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="container flex flex-wrap p-5 justify-self-center items-center bg-white dark:bg-gray-200 shadow  md:w-[50%] w-[80%]">
        <div>
          <img src={Auth} alt="auth" width="350px" />
        </div>
        <div className="grow p-5">
          <h3 className="text-3xl text-center font-medium">Register</h3>
          <RegisterForm />
          <p>
            you have accout?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
