import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddJobPage = () => {
  const navigate = useNavigate();

  // State to manage form fields
  const [formData, setFormData] = useState({
    position: "",
    job_description: "",
    job_address: "",
    job_category: "",
    salary_range: "", // Single field for salary range
    work_schedule: "",
  });
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle salary range changes
  const handleSalaryChange = (e, type) => {
    const value = e.target.value;
    setFormData((prev) => {
      const [min, max] = prev.salary_range.split(" - ");
      return {
        ...prev,
        salary_range:
          type === "min"
            ? `${value || ""} - ${max || ""}`
            : `${min || ""} - ${value || ""}`,
      };
    });
  };

  // Handle select changes
  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to your API
      const response = await axios.post(
        "http://localhost:3000/api/job",
        formData,
        {
          withCredentials: true,
        }
      );

      alert("Job added successfully!");
      navigate("/company/jobs"); // Redirect after adding job
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job. Please try again.");
    }
  };

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
              <div className="bg-white border border-gray-200 overflow-hidden pt-2">
                <div className="px-6 py-4 flex flex-col border-gray-200">
                  <div className="flex flex-col space-y-2 mt-3 px-4 sm:px-7">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Post New Job
                    </h2>
                    <p className="text-muted-foreground mt-3 text-gray-600">
                      Fill in the form below to post a new job.
                    </p>
                  </div>
                  <Separator className="mt-7" />

                  <div className="bg-white">
                    <div className="p-4 sm:p-7 overflow-y-auto">
                      <div className="flex flex-col text-left gap-y-5">
                        <div>
                          <p className="text-sm font-bold mb-2">Position</p>
                          <Input
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold mb-2">
                            Job Description
                          </p>
                          <Textarea
                            name="job_description"
                            value={formData.job_description}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <p className="text-sm font-bold mb-2">Job Address</p>
                          <Input
                            name="job_address"
                            value={formData.job_address}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <p className="text-sm font-bold mb-2">Job Category</p>
                          <Select
                            value={formData.job_category}
                            onValueChange={(value) =>
                              handleSelectChange(value, "job_category")
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Job Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Job Category</SelectLabel>
                                <SelectItem value="Remote">Remote</SelectItem>
                                <SelectItem value="Onsite">Onsite</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <p className="text-sm font-bold mb-2">Salary Range</p>
                          <div className="flex gap-x-2">
                            <Input
                              name="salary_range_min"
                              placeholder="Min Salary"
                              value={
                                formData.salary_range.split(" - ")[0] || ""
                              }
                              onChange={(e) => handleSalaryChange(e, "min")}
                              maxLength="11"
                            />
                            {" - "}
                            <Input
                              name="salary_range_max"
                              placeholder="Max Salary"
                              value={
                                formData.salary_range.split(" - ")[1] || ""
                              }
                              onChange={(e) => handleSalaryChange(e, "max")}
                              maxLength="11"
                            />
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-bold mb-2">
                            Work Schedule
                          </p>
                          <Select
                            value={formData.work_schedule}
                            onValueChange={(value) =>
                              handleSelectChange(value, "work_schedule")
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Work Schedule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Work Schedule</SelectLabel>
                                <SelectItem value="Full Time">
                                  Full Time
                                </SelectItem>
                                <SelectItem value="Part Time">
                                  Part Time
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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
                    Perform actions on the Job below.
                  </p>
                  <Separator className="mt-2" />
                </div>
                <div className="px-6 py-4 flex flex-col border-gray-200 gap-y-2">
                  <Button onClick={handleSubmit}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobPage;
