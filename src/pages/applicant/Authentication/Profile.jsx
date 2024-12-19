import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import axios from "axios";

import EditApplicantDialog from "@/components/applicants/authentication/EditApplicantDialog";
import EditApplicantContactDialog from "@/components/applicants/authentication/EditApplicantContactDialog";
import EditApplicantCVDialog from "@/components/applicants/authentication/EditApplicantCVDialog";
import ApplicantCVViewer from "@/components/applicants/authentication/ApplicantCVViewer";
import DeleteApplicantDialog from "@/components/applicants/authentication/DeleteApplicantDialog";
import UpdatePasswordDialog from "@/components/applicants/authentication/UpdatePasswordDialog";

import ApplicantExperience from "@/components/applicants/authentication/ApplicantExperience";
import JobCard from "@/components/applicants/authentication/JobCard";

const Profile = () => {
  const [applicant, setApplicant] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(jobs);

  useEffect(() => {
    // Fetch jobs from the API
    axios
      .get("http://localhost:3000/api/job/applicant/jobs", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setJobs(response.data.appliedJobs); // Set the jobs data
        setFilteredJobs(response.data); // Set filtered jobs as all jobs initially
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/applicant",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.data;
        setApplicant(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApplicants();
  }, []);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.done_onboarding === false) {
      navigate("/applicant/onboarding");
    }

    if (userInfo?.account_type !== "applicant") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <div className="flex w-screen justify-center py-36 bg-[#f0f0f0]">
        <div className="m-10 ">
          <Card className="md:w-[1080px] py-5 mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="font-bold">Profile</CardTitle>
              <CardDescription className="text-black">
                Build Your Profile, Showcase Your Skills, and Unlock New Career
                Opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5">
              <div className="mt-2">
                <div className="flex flex-row justify-between items-center gap-x-2">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-200">
                    Acount Information
                  </h1>
                  <EditApplicantDialog
                    username={applicant.username}
                    email={applicant.email}
                    firstName={applicant.first_name}
                    lastName={applicant.last_name}
                  />
                </div>
                <Separator className="bg-black my-3" />
                <div className="flex items-center">
                  <div className="flex flex-col grow gap-y-1">
                    <h1 className="text-xs text-neutral-500">
                      User ID: {applicant.applicant_id}
                    </h1>
                    <h1 className="text-xs text-neutral-500">
                      Username: {applicant.username}
                    </h1>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-200">
                      {applicant.first_name} {applicant.last_name}
                    </h1>
                    <h1 className="text-md text-gray-800 dark:text-neutral-200">
                      {applicant.email}
                    </h1>
                  </div>
                  
                  <UpdatePasswordDialog/>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex flex-row items-center justify-between gap-x-2">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-200">
                    Contact Information
                  </h1>
                  <EditApplicantContactDialog />
                </div>
                <Separator className="bg-black my-3" />
                <div className="flex items-center">
                  <div className="flex flex-col grow gap-y-1">
                    <h1 className="text-sm font-bold text-gray-800 dark:text-neutral-200">
                      {applicant.contact && applicant.contact.length > 0 ? (
                        <>
                          <p>
                            Email Addres: {applicant.contact[0].contact_email}
                          </p>
                          <p>
                            Mobile Number: {applicant.contact[0].contact_no}
                          </p>
                        </>
                      ) : (
                        <p>No contact information available.</p>
                      )}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex flex-row items-center justify-between gap-x-2">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-200">
                    Contact Information
                  </h1>
                  <EditApplicantCVDialog />
                </div>
                <Separator className="bg-black my-3" />
                <div className="flex items-center">
                  <div className="flex flex-col grow gap-y-1">
                    <h1 className="text-sm font-bold text-gray-800 dark:text-neutral-200">
                      {applicant.cv && applicant.cv.length > 0 ? (
                        <ApplicantCVViewer cv_file={applicant.cv[0].cv_file} />
                      ) : (
                        <p>No CV/Resume available.</p>
                      )}
                    </h1>
                  </div>
                </div>
              </div>

              {applicant.contact && applicant.contact.length > 0 ? (
                <ApplicantExperience experience={applicant.experience} />
              ) : (
                <p>No contact information available.</p>
              )}

              <div className="mt-5">
                <div className="flex flex-row items-center justify-between gap-x-2">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-200">
                    Applied Jobs
                  </h1>
                </div>
                <Separator className="bg-black my-3" />
                <div className="flex items-center">
                  <div className="flex flex-col grow gap-y-1">
                    <h1 className="flex flex-col text-sm  text-gray-800 dark:text-neutral-200 gap-y-5">
                      {jobs.map((job) => (
                        <JobCard key={job.job_posting_id} job={job} />
                      ))}
                    </h1>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-10">
            <DeleteApplicantDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
