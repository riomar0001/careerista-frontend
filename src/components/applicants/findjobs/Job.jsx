import React, { useState, useEffect } from "react";
import axios from "axios";

import JobCard from "./JobCard";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch jobs from the API
    axios
      .get("http://localhost:3000/api/job", {
        headers: {
          "Access-Control-Allow-Origin": "*", // Handle CORS
        },
      })
      .then((response) => {
        setJobs(response.data); // Set the jobs data
        setFilteredJobs(response.data); // Set filtered jobs as all jobs initially
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter jobs based on search query (by job title or company)
    const filtered = jobs.filter(
      (job) =>
        job.position.toLowerCase().includes(query.toLowerCase()) ||
        job.company_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 mb-10">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col justify-center items-center pt-40 pb-20 top-0">
      <div className="flex flex-col justify-center text-center mx-auto gap-y-3">
        <h1 className="font-clash-display font-bold text-5xl">Find Jobs</h1>
        <p className="font-clash-display text-xl max-w-xl">
          Search and find your dream job is now easier than ever. Just browse a
          job and apply if you need to.
        </p>
      </div>

      <div className="flex md:flex-row flex-col max-w-3xl mt-10 md:gap-x-3 gap-y-3">
        <Input
          placeholder="Job Title, Company"
          type="text"
          className="h-16 md:w-[569px] w-max font-poppins"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button className="h-16 px-6 font-poppins">Find Job</Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 grid-rows-2 mt-10 gap-5">
        {filteredJobs.map((job) => (
          <JobCard key={job.job_posting_id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Job;
