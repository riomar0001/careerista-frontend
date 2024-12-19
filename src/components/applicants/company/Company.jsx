import React from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";


import CompanyCard from "./CompanyCard";

const Company = () => {
  return (
    <div className="flex flex-col bg-[#F8E968] justify-center items-center pt-40 pb-20">
      <div className="flex flex-col justify-center items-center text-center mx-auto gap-y-3">
        <h1 className="font-clash-display font-bold text-5xl">
          Choose Your Dream Companies
        </h1>
        <p className="font-clash-display text-xl max-w-xl text-center">
          Start your journey towards a fulfilling career by exploring the top
          companies that are actively seeking talented individuals like you
        </p>
      </div>

      <div className="flex md:flex-row flex-col max-w-3xl mt-10 md:gap-x-3 gap-y-3">
        <Input
          placeholder="Company Name"
          type="text"
          className="h-16 md:w-[569px] w-max font-poppins"
        />
        <Button className="h-16 px-6 font-poppins">Find Company</Button>
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
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </div>
    </div>
  );
};

export default Company;
