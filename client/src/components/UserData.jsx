import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

function UserData() {
  const [data, setData] = useState({
    username: "noureddine",
    email: "noureddine@gmail.com",
    role: "user",
    password: "12345678",
  });
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className=" mx-auto">
        <i className="text-5xl"><CgProfile />
        </i>
      </div>
      <div className="w-full my-5">
        <p className="text-3xl font-medium text-center">
          Welcome <span className="text-green-600">{data.username}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex">
          <label className="text-xm font-medium w-30" htmlFor="name">
            username :{" "}
          </label>
          <div className="flex flex-col">
            <input
              className="border p-1 text-xm bg-gray-300"
              type="text"
              value={data.username}
              readOnly
            />
            <p className="text-sm text-gray-600 underline">cant chant it</p>
          </div>
        </div>
        <div className="flex">
          <label className="text-xm font-medium w-30" htmlFor="name">
            Email :{" "}
          </label>
          <div className="flex flex-col">
            <input
              className="border p-1 text-xm bg-gray-400"
              type="email"
              value={data.email}
              readOnly
            />
            <p className="text-sm text-gray-600 underline">cant chant it</p>
          </div>
        </div>
        <div className="flex">
          <label className="text-xm font-medium w-30" htmlFor="name">
            Password:
          </label>
          <div className="flex flex-col">
            <input
              className="border p-1 text-xm"
              type="password"
              value={data.password}
              readOnly
            />
            <p className="text-sm text-blue-600 underline">change it</p>
            <div>
              <div>
                <form action="">change password from</form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <button className="bg-green-400 py-2 px-5 hover:bg-green-200 text-xm w-50">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserData;
