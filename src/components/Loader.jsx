import React from "react";
import spinner from "../../public/assets/images/spinner.svg";

const Loader = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      {/* <div className="text-customRed text-4xl font-extrabold animate-spin">
        <ion-icon name="refresh-outline"></ion-icon>
      </div> */}
      <div className="">
        <img className="w-[40px]" src={spinner} />
      </div>
    </div>
  );
};

export default Loader;
