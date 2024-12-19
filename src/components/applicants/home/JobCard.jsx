import React from "react";
import { MapPin, BriefcaseBusiness, Banknote } from "lucide-react";

const JobCard = ({ job }) => {
  const {
    position,
    company_id,
    job_address,
    work_schedule,
    salary_range,
    job_category,
    created_at,
    company_name
  } = job;

  // Convert the 'created_at' to a more readable format
  const jobPostedDate = new Date(created_at);
  const formattedDate = `${jobPostedDate.getDate()}/${jobPostedDate.getMonth() + 1}/${jobPostedDate.getFullYear()}`;

  return (
    <div className="border hover:border-black shadow p-5 sm:w-[280px] w-[350px] rounded-lg">
      <a href="#">
        <div className="flex items-center gap-x-7">
          <div className="flex flex-col items-start overflow-hidden">
            <p className="font-clash-display font-medium text-xl">{position}</p>
            <p className="font-clash-display text-xs">{company_name}</p> {/* You can replace company_id with actual company name if available */}
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-y-1">
          <div className="flex flex-row gap-x-2">
            <MapPin size={16} />
            <span className="font-clash-display text-xs">{job_address}</span>
          </div>
          <div className="flex flex-row gap-x-2">
            <BriefcaseBusiness size={16} />
            <span className="font-clash-display text-xs">{work_schedule}</span>
          </div>
          <div className="flex flex-row gap-x-2">
            <Banknote size={16} />
            <span className="font-clash-display text-xs">{salary_range}</span>
          </div>
          <div className="flex flex-row mt-3 gap-x-2">
            <p className="border text-xs p-1 bg-neutral-200 rounded font-clash-display">
              {job_category}
            </p>
            <p className="border text-xs p-1 bg-neutral-200 rounded font-clash-display">
              {formattedDate} {/* Display job post date */}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default JobCard;
