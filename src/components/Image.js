import React from "react";

const Image = ({ imgUrl }) => {
  return (
    <>
      <div className="row-item w-40 mx-8  hover:scale-110  hover:z-10 hover:border-4 active:border-4 active:border-red-700 border-white transition-all">
        <img
          src={imgUrl}
          alt="moivieimage"
          className="max-w-none w-[100%] rounded-lg"
        />
      </div>
    </>
  );
};

export default Image;
