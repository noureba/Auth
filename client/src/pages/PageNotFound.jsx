import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <div className="container flex flex-col gap-10 justify-center items-center">
        <h3 className="text-5xl font-medium dark:dark:text-white">
          Page Not Found
        </h3>
        <Link to="/login">
          <button className="bg-white text-black  py-3 px-5">
            Go to Login page
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
