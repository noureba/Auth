import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const login = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        backendUrl + "/api/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setIsLoggedin(true);
        getUserData();
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="py-10">
      <form
        action=""
        className="flex flex-col gap-3"
        onSubmit={login}
        method="POST"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">
            Email<span className="text-red-600">*</span>
          </label>
          <input
            className="border p-1 text-xm"
            type="email"
            name="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">
            Password<span className="text-red-600">*</span>
          </label>
          <input
            className="border p-1 text-xm"
            type="password"
            name="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="submit"
            value="Sing in"
            className="bg-green-300 py-3 text-xl"
          />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
