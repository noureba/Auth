import LoginForm from "../components/LoginForm";
import Auth from "../../public/Auth.jpg";
import { Link } from "react-router-dom";


function Login() {
  return (
    <>
      <div className="container flex flex-wrap p-5 justify-self-center items-center bg-white dark:bg-gray-200 shadow  md:w-[50%] w-[80%]">
        <div>
          <img src={Auth} alt="auth" width="350px" className="rounded-2xl" />
        </div>
        <div className="grow p-5">
          <h3 className="text-3xl text-center font-medium">Login</h3>
          <LoginForm />
          <p>
            you dont have accout? {" "}
            <Link to="/register" className="text-blue-600 underline">
              sing up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
