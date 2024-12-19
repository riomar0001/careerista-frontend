import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, Pencil, FileUser } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import axios from "axios";

import ApplicantList from "@/components/companies/ApplicantList";

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/job/${id}`,
          {
            withCredentials: true,
          }
        );
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  const handleCloseJob = async () => {
    if (window.confirm("Are you sure you want to close this job?")) {
      try {
        await axios.patch(
          `http://localhost:3000/api/job/close/${id}`,
          {}, // Empty payload
          { withCredentials: true } // Config for credentials and CORS
        );
        alert("Job closed successfully!");
        setJob({ ...job, is_closed: true }); // Update local state to reflect the change
      } catch (error) {
        console.error("Error closing the job:", error);
        alert("Failed to close the job. Please try again.");
      }
    }
  };

  // Handler function to delete the job
  const handleDeleteJob = async () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="w-full h-full lg:ps-64">
      <div className="p-2 sm:p-6 space-y-4 sm:space-y-6 border">
        <div className="max-w-auto px-4 sm:px-6 lg:px-8 mx-auto">
          <Link
            to="/company/jobs"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90"
          >
            <ArrowLeftIcon size={20} />
            Go Back
          </Link>
          <div className="grid gap-7 py-5 px-1 lg:py-5 grid-cols-1 md:grid-cols-7 sm:gap-6">
            <div className="-m-1.5 overflow-x-auto md:col-span-5 shadow-md rounded-xl">
              <div className="px-6 py-4 flex flex-col border-gray-200">
                <div className="flex flex-col space-y-2 mt-3 px-4 sm:px-7">
                  <h2 className="text-2xl font-bold tracking-tight">
                    Job Details
                  </h2>
                  <p className="text-muted-foreground mt-3 text-gray-600">
                    View details of the Job Offer below.
                  </p>
                </div>
                <Separator className="mt-7" />
                <div>
                  <div className="p-4 sm:p-7 overflow-y-auto">
                    <div className="flex flex-col text-left gap-y-5">
                      <div>
                        <p className="text-xs text-gray-400">Job Status</p>
                        <p className="font-semibold text-sm">
                          {job.is_closed ? "Closed" : "Open"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Job Posted Date</p>
                        <p className="font-semibold text-sm">
                          {new Date(job.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {job.company_name}
                        </h3>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Position</p>
                        <h3 className="text-2xl font-semibold text-gray-800">
                          {job.position}
                        </h3>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Job Description</p>
                        <p className="font-semibold">{job.job_description}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Job Category</p>
                        <p className="font-semibold">{job.job_category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Job Address</p>
                        <p className="font-semibold">{job.job_address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Salary Range</p>
                        <p className="font-semibold">{job.salary_range}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Work Schedule</p>
                        <p className="font-semibold">{job.work_schedule}</p>
                      </div>

                      <Separator className="mt-7" />
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                          Applicants
                        </h2>
                        <ApplicantList id={id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="-m-1.5 overflow-x-auto md:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                <div className="flex flex-col space-y-2 mt-3 px-5 sm:px-6">
                  <h2 className="text-base font-bold tracking-tight">
                    Actions
                  </h2>
                  <p className="text-muted-foreground text-gray-600">
                    Perform actions on the job offer below.
                  </p>
                  <Separator className="mt-2" />
                </div>
                <div className="px-6 py-4 flex flex-col border-gray-200 gap-y-2">
                  <Button variant="outline">
                    <Link to={`/company/jobs/edit/${id}`} className="w-full">
                      <span className="inline-flex items-center gap-2">
                        <Pencil size={16} />
                        <p className="text-sm">Edit</p>
                      </span>
                    </Link>
                  </Button>
                  <Button onClick={handleCloseJob} disabled={job.is_closed}>
                    Close Job
                  </Button>
                </div>
                <div className="px-6 py-4 flex flex-col border-gray-200">
                  <Separator className="mb-6" />
                  <Button
                    variant="destructive"
                    onClick={handleDeleteJob}
                    disabled={isApplied}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
