import React from "react";
const CompanyCard = () => {
  return (
    <div className="p-5 sm:w-[250px] w-[350px] rounded-lg bg-white hover:bg-white/80">
      <a href="#">
        <div className="flex items-center gap-x-7">
          <img src="Harvard.svg" alt="job1" className="h-10" />
          <div className="flex flex-col items-start overflow-hidden">
            <p className="font-clash-display font-medium text-base text-nowrap">
              Harvard University
            </p>
            <p className="font-clash-display text-xs">64 Jobs Available</p>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-y-1">
          <div className="flex flex-row gap-x-2">
            <span className="font-clash-display text-sm text-just">
              Search and find your dream job is now easier than ever Just browse
              a job and apply if you need to
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CompanyCard;
