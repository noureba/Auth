import React, { useState } from "react";

function LoginForm() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const register = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="py-10">
      <form action="" className="flex flex-col gap-3" onSubmit={register}>
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
          <input type="submit" value="Sing in" className="bg-green-300 py-3 text-xl" />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
