import JobsCard from "./JobsCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch jobs from the API
    axios
      .get("http://localhost:3000/api/job/company/jobs", {
        withCredentials: true, // Include credentials (cookies)
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
    <div>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4 max-w-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-5 mx-auto gap-y-5">
        {filteredJobs.map((job) => (
          <JobsCard key={job.job_posting_id} job={job} />
        ))}
      </div>
    </div>
  );
};
export default JobList;
