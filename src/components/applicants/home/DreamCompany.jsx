import React from "react";

import CompanyCard from "./CompanyCard";

const DreamCompany = () => {
  return (
    <div className="flex flex-col bg-[#F8E968] justify-center items-center pt-20 pb-10 border">
      <div className="flex flex-col justify-center items-center text-center mx-auto gap-y-3">
        <h1 className="font-clash-display font-bold text-5xl">
          Choose Your Dream Companies
        </h1>
        <p className="font-clash-display text-xl max-w-xl text-center">
          Start your journey towards a fulfilling career by exploring the top
          companies that are actively seeking talented individuals like you
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-cols-1 grid-rows-2 mt-10 gap-5">
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </div>

      <div className="mt-10">
        <a
          href="#"
          className="text-xl bg-black rounded-md text-white py-3 px-6 font-clash-display"
        >
          View All Companies
        </a>
      </div>
    </div>
  );
};

export default DreamCompany;
