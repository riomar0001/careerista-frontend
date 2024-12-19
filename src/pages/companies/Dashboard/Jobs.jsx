import React from "react";
import JobList from "@/components/companies/JobList";
import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";

const Jobs = () => {
  return (
    <div className="w-full h-full lg:ps-64 ">
      <div className="p-2 sm:p-6 space-y-4 sm:space-y-6">
        {/* <!-- Table Section --> */}
        <div className=" max-w-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-5 mx-auto">
          {/* <!-- Card --> */}
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden ">
                  {/* <!-- Header --> */}
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                    <div className="flex items-center justify-between space-y-2">
                      <div>
                        <h2 className="text-2xl font-semibold">
                          Jobs Posted
                        </h2>
                      </div>
                    </div>
                    <div>
                      <div className="inline-flex gap-x-2">
                        <Link
                          to="/company/jobs/add"
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 "
                          href="#"
                        >
                          <Plus size={20} />
                          Post New Jobs 
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Header --> */}

                  {/* <!-- Table --> */}
                  <JobList />
                  {/* <!-- End Table --> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Card --> */}
        </div>
        {/* <!-- End Table Section --> */}
      </div>
    </div>
  );
};

export default Jobs;
