import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import { Link, useNavigate } from "react-router-dom";

const LatestJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from the API
    axios
      .get("http://localhost:3000/api/job/all/recent", {
        headers: {
          "Access-Control-Allow-Origin": "*", // Handle CORS
        },
      })
      .then((response) => {
        setJobs(response.data); // Set the jobs data
        console.log("Jobs fetched successfully:", response);
        
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false); // Set loading to false even if there is an error
      });

      
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 mb-10">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20 mb-10">
      <div className="flex flex-col justify-center text-center mx-auto gap-y-3">
        <h1 className="font-clash-display font-bold text-5xl">
          Latest Featured Jobs
        </h1>
        <p className="font-clash-display text-xl max-w-xl">
          Search and find your dream job is now easier than ever. Just browse a
          job and apply if you need to
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 grid-rows-2 mt-10 gap-5">
        {jobs.map((job) => (
          <JobCard key={job.job_posting_id} job={job} />
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/find-jobs"
          className="text-xl bg-black rounded-md text-white py-3 px-6 font-clash-display"
        >
          View All Jobs
        </Link>
      </div>
    </div>
  );
};

export default LatestJob;
