import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    let timer: null | NodeJS.Timeout;

    function dbounce() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setHeight(window.innerHeight);
      }, 250);
    }

    window.addEventListener("resize", dbounce);
    return () => window.removeEventListener("resize", dbounce);
  }, []);

  const navigate = useNavigate();
  return (
    <div
      style={{ height }}
      className="flex flex-col justify-center items-center w-full bg-black text-red-700 text-3xl"
    >
      <h1 className=" text-red-700 text-3xl font-extrabold">
        404 Not Found Error
      </h1>

      <button
        className="mt-10 hover:scale-110 active:scale-100 transition-all duration-150 ease-linear select-none"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default Error;
