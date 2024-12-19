import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import axios from "axios";
import { setCredentials } from "@/Redux/slices/authSlice";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Spinner from "@/components/companies/Spinner";

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", userInfo.name);
      formData.append("contact_no", data.contact_no);
      formData.append("email", data.email);
      formData.append("company", data.company);
      formData.append("address", data.address);
      formData.append("position", data.position);
      formData.append("years_of_stay", data.years_of_stay);
      formData.append("cv_file", data.cv_file[0]);

      const response = await axios.post(
        "http://localhost:3000/api/applicant/onboarding",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      dispatch(
        setCredentials({
          ...userInfo,
          done_onboarding: true,
        })
      );

      toast.success("Sign Up Successful!", {
        description:
          response.data.message ||
          "Your account has been created successfully.",
        classNames: {
          icon: "text-teal-800",
          title: "text-teal-800",
          description: "text-teal-800",
          bg: "bg-teal-100",
        },
      });

      navigate("/"); // Redirect to home page after signup
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      toast.error("Sign Up Failed!", {
        description:
          error.response?.data?.error || "An error occurred while signing up.",
        classNames: {
          icon: "text-red-800",
          title: "text-red-800",
          description: "text-red-800",
          bg: "bg-red-100",
        },
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      userInfo.done_onboarding
        ? navigate("/")
        : navigate("/applicant/onboarding");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex justify-center py-36 bg-[#f0f0f0]">
      <div className="m-10 ">
        <Card className="lg:w-[800px] py-5 shadow-lg ">
          <CardHeader>
            <CardTitle className="font-bold">Onboarding</CardTitle>
            <CardDescription className="text-black">
              Complete Setting Up Your Account and Land Your Dream Job
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-5">
                <div className="flex flex-col space-y-1.5">
                  <div className="mb-5">
                    <Label>Full Name</Label>
                    <h1 className="text-3xl font-semibold">{userInfo.name}</h1>
                  </div>
                </div>

                {/* Contact Information */}
                <h1 className="text-xl font-semibold mt-3">
                  Contact Information
                </h1>
                <Separator className="bg-black" />
                <div className="flex flex-col space-y-1.5">
                  <Label>Contact No.</Label>
                  <Input
                    placeholder="Enter your Contact Number"
                    onKeyPress={(e) =>
                      !/^[0-9]$/.test(e.key) && e.preventDefault()
                    }
                    maxLength="11"
                    minLnegth="11"
                    {...register("contact_no", { required: true })}
                  />
                  {errors.contact_no && (
                    <p className="text-red-600">Contact number is required</p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    placeholder="Enter your Email"
                    type="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-600">Email is required</p>
                  )}
                </div>

                {/* Resume/CV */}
                <h1 className="text-xl font-semibold mt-3">Resume/CV</h1>
                <Separator className="bg-black" />
                <div className="flex flex-col space-y-1.5">
                  <Label>Resume/CV</Label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register("cv_file", { required: true })}
                  />
                  {errors.cv_file && (
                    <p className="text-red-600">CV/Resume is required</p>
                  )}
                </div>

                <div>
                  <h1 className="text-xl font-semibold mt-3">
                    Experience (Optional)
                  </h1>
                  <p className="text-sm italic text-neutral-500">
                    Please Enter N/A on all fields if No Experience
                  </p>
                </div>
                <Separator className="bg-black" />
                <div className="flex flex-col space-y-1.5">
                  <Label>Company</Label>
                  <Input
                    placeholder="Enter the Company Name"
                    {...register("company")}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Address</Label>
                  <Input
                    placeholder="Enter the Company Address"
                    {...register("address")}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Position</Label>
                  <Input
                    placeholder="Enter your position"
                    {...register("position")}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Year of Stay</Label>
                  <Input
                    placeholder="Enter the Year of Stay"
                    {...register("years_of_stay")}
                  />
                </div>
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </div>
              <Dialog open={isLoading}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Completing Your Account</DialogTitle>
                    <DialogDescription className="py-2 flex flex-col gap-x-2 gap-y-3 justify-center items-center">
                      Please wait while we process your request.
                      <Spinner />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
