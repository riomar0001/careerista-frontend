import React from "react";
import JobList from "@/components/companies/JobList";

const Dashboard = () => {
  return (
    <div className="w-full h-full lg:ps-64">
      <div className="p-4 sm:p-6">
        <div className="max-w-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-5 mx-auto">
          <h1 className="text-xl">Dashboard</h1>
        </div>
        <JobList />
      </div>
    </div>
  );
};

export default Dashboard;
