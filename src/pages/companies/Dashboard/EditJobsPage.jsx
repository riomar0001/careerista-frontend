import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const EditJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Fetch the job ID from URL params

  const [formData, setFormData] = useState({
    position: "",
    job_description: "",
    job_address: "",
    job_category: "",
    salary_range_min: "",
    salary_range_max: "",
    work_schedule: "",
  });

  // Fetch job details on component mount
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/job/${id}`);
        const data = response.data;

        console.log(data);
        

        // Split salary_range into min and max
        const [salaryMin, salaryMax] = data.salary_range.split(" - ");

        // Populate form data
        setFormData({
          position: data.position,
          job_description: data.job_description,
          job_address: data.job_address,
          job_category: data.job_category,
          salary_range_min: salaryMin,
          salary_range_max: salaryMax,
          work_schedule: data.work_schedule,
        });
      } catch (error) {
        console.error("Error fetching job details:", error);
        alert("Failed to fetch job details.");
      }
    };

    fetchJobDetails();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission (update job)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        salary_range: `${formData.salary_range_min} - ${formData.salary_range_max}`, // Combine salary min and max
      };

      // Send PUT request to update job details
      await axios.put(`http://localhost:3000/api/job/${id}`, updatedData, {
        withCredentials: true,
      });

      alert("Job updated successfully!");
      navigate("/company/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job. Please try again.");
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
                      Edit Job Details
                    </h2>
                    <p className="text-muted-foreground mt-3 text-gray-600">
                      Edit the job details below.
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
                              value={formData.salary_range_min}
                              onChange={handleChange}
                              placeholder="Min Salary"
                            />
                            {" - "}
                            <Input
                              name="salary_range_max"
                              value={formData.salary_range_max}
                              onChange={handleChange}
                              placeholder="Max Salary"
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
                    Update the job details below.
                  </p>
                  <Separator className="mt-2" />
                </div>
                <div className="px-6 py-4 flex flex-col border-gray-200 gap-y-2">
                  <Button onClick={handleSubmit}>Save Changes</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobPage;
