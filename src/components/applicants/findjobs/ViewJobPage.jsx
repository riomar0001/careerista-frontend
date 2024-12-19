import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, FileUser } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import axios from "axios";


const ViewJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for job data, loading state, and applied status
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  // Fetch job data from the API using async/await
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/job/${id}`,
          {
            withCredentials: true,
          }
        );
        setJob(response.data); // Set job data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching job data:", error);
        setLoading(false);
      }
    };

    const checkIfApplied = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/job/applied/${id}`,
          {
            withCredentials: true,
          }
        );
        setIsApplied(response.data.applied); // Set applied status
      } catch (error) {
        console.error("Error checking job application status:", error);
      }
    };

    fetchJobData();
    checkIfApplied();
  }, [id]);

  // Handle apply job button click using async/await
  const handleApplyJob = async () => {
    if (userInfo?.done_onboarding === false) {
      alert("Please complete your onboarding first.");
      return navigate("/applicant/onboarding");
    }
    if (userInfo?.account_type !== "applicant") {
      navigate("/applicant/signin");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/job/apply/${id}`,
          {},
          {
            withCredentials: true,
          }
        );
        alert("Job applied successfully!");
        setIsApplied(true); // Update applied status
      } catch (error) {
        console.error("Error applying for the job:", error);
        alert("Failed to apply for the job.");
      }
    }
  };



  // Handle cancel application button click using async/await
  const handleCancelApplication = async () => {



    try {
      const response = await axios.delete(
        `http://localhost:3000/api/job/cancel/${id}`,
        {
          withCredentials: true,
        }
      );
      alert("Job application cancelled.");
      setIsApplied(false); // Update applied status
    } catch (error) {
      console.error("Error cancelling the job application:", error);
      alert("Failed to cancel the job application.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center my-28">
        <p>Loading...</p>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (!job) {
    return (
      <div className="flex justify-center my-28">
        <p>Job not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col justify-center items-center pt-36 pb-20 top-0">
      <div className="p-2 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl">
        <div className="max-w-auto px-4 sm:px-6 lg:px-8 mx-auto">
          <Link
            onClick={handleGoBack}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90"
          >
            <ArrowLeftIcon size={20} />
            Go Back
          </Link>
          <div className="grid gap-7 py-5 px-1 lg:py-5 grid-cols-1 md:grid-cols-7 sm:gap-6">
            <div className="-m-1.5 overflow-x-auto md:col-span-5 shadow-md rounded-xl">
              <div className="bg-white border border-gray-200 overflow-hidden pt-2">
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
                  <div className="bg-white">
                    <div className="p-4 sm:p-7 overflow-y-auto">
                      <div className="flex flex-col text-left gap-y-5">
                        <div>
                          <p className="text-xs text-gray-400">Job Status</p>
                          <p className="font-semibold text-sm">
                            {job.is_closed ? "Closed" : "Open"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">
                            Job Posted Date
                          </p>
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
                          <p className="text-sm text-gray-500">
                            Job Description
                          </p>
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
                    Perform actions on the job below.
                  </p>
                  <Separator className="mt-2" />
                </div>
                <div className="px-6 py-4 flex flex-col border-gray-200 gap-y-2">
                  <Button
                    onClick={
                      isApplied ? handleCancelApplication : handleApplyJob
                    }
                    variant={isApplied ? "destructive" : ""}
                  >
                    <FileUser size={16} />
                    {isApplied ? "Cancel Application" : "Apply Job"}
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

export default ViewJobPage;
