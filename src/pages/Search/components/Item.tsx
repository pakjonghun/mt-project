import React from "react";
import basic from "../../../images/empty.jpg";

const Item = () => {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer">
      <div className="overflow-hidden">
        <img
          className="w-full h-full hover:scale-125 active:scale-100 transition-all duration-150 ease-linear"
          src={basic}
          alt="basic"
        />
      </div>
      <div className="w-full pl-2">
        <h4>title</h4>
        <p>stars</p>
      </div>
    </div>
  );
};

export default Item;
