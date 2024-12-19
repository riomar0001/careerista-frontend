import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importing useNavigate
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, BriefcaseBusiness, Banknote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JobsCard = ({ job }) => {
  const navigate = useNavigate(); // Use navigate hook
  const {
    job_posting_id,
    position,
    job_address,
    work_schedule,
    salary_range,
    job_category,
    created_at,
    company_name,
    job_description,
  } = job;

  const jobPostedDate = new Date(created_at);
  const formattedDate = `${jobPostedDate.getDate()}/${jobPostedDate.getMonth() + 1}/${jobPostedDate.getFullYear()}`;

  const handleDeleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:3000/api/job/${id}`, {
          withCredentials: true,
        });
        alert("Job deleted successfully!");
        navigate("/company/jobs"); // Redirect after deletion
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete the job. Please try again.");
      }
    }
  };

  return (
    <Card className="sm:w-[350px]">
      <CardHeader>
        <CardTitle>{position}</CardTitle>
        <CardDescription>{job_description.substring(0,100)}</CardDescription>
      </CardHeader>
      <CardContent>
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
              {formattedDate}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive" onClick={() => handleDeleteJob(job_posting_id)}>
          Delete
        </Button>
        <Link
          to={`/company/jobs/${job_posting_id}`}
          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90"
        >
          View Job
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobsCard;
