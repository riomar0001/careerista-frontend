import React from "react";
import { Separator } from "@/components/ui/separator";

import EditApplicantExperienceDialog from "@/components/applicants/authentication/EditApplicantExperienceDialog";
import AddApplicantExperienceDialog from "@/components/applicants/authentication/AddApplicantExperienceDialog";

const ApplicantExperience = ({ experience }) => {
  return (
    <div className="mt-5">
      <div className="flex flex-row items-center justify-between gap-x-2">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-200">
          Work Experience
        </h1>
        <AddApplicantExperienceDialog />
      </div>
      <Separator className="bg-black my-3" />
      <div className="flex items-center ">
        <div className="flex flex-col grow gap-y-5">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="border rounded-lg flex flex-row justify-between p-4"
            >
              <div>
                <p className="text-lg font-semibold">{exp.company}</p>
                <p className="text-sm "> Position: {exp.position}</p>
                <p className="text-sm "> Address: {exp.address}</p>
                <p className="text-sm ">
                  {" "}
                  Years of Stay: {exp.years_of_stay} Year/s
                </p>
              </div>
              <EditApplicantExperienceDialog exp={exp} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantExperience;
