import React from "react";

const TrustedCompanies = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#EE7236] py-14">
      <h1 className="font-clash-display text-xl text-white">
        Trusted by the best companies
      </h1>

      <div className="flex items-center justify-center smflex-row md:gap-x-10 gap-6 mt-8 px-5 flex-wrap">
        <img src="/Apple.svg" />
        <img src="/AT&T.svg" />
        <img src="/Meta.svg" />
        <img src="/McDonalds.svg" />
        <img src="/Sony.svg" />
      </div>
    </div>
  );
};

export default TrustedCompanies;
