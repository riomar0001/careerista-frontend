import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/Redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Spinner from "./Spinner";
import { toast } from "sonner";

const OnboardingForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const navigate = useNavigate();

    const dispatch = useDispatch();

  const API_URL = import.meta.env.VITE_API_URL;

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/company/industries",
          {
            withCredentials: true,
          }
        );

        setIndustries(response.data.industries);
      } catch (error) {
        console.error("Failed to fetch industries", error);
      }
    };

    fetchIndustries();
  }, []);

  const handleIndustryChange = (value) => {
    console.log(value === "other");

    setValue("industry", value);
    setIsOtherSelected(value === "other");
  };

  const compressImage = (imageFile) => {
    return new Promise((resolve, reject) => {
      new Compressor(imageFile, {
        quality: 0.6, // Compress to 60% quality
        maxWidth: 1920, // Optional: resize image to fit max width
        success: (compressedResult) => resolve(compressedResult),
        error: (error) => reject(error),
      });
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    const logo = data.logo[0];

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

    if (logo && logo.size > MAX_FILE_SIZE) {
      toast.error("File size too large", {
        description: "Please upload an image with a maximum size of 10MB.",
        classNames: {
          icon: "text-red-800",
          title: "text-red-800",
          description: "text-red-800",
          bg: "bg-teal-100",
        },
      });
      return;
    }

    try {
      const formData = new FormData();
      const compressedLogo = await compressImage(data.logo[0]);

      console.log(isOtherSelected);

      formData.append("address", data.address);
      formData.append("contact_no", data.contact_no);
      formData.append("email", data.email);
      formData.append(
        "industry_name",
        isOtherSelected ? data.otherIndustry : data.industry
      );
      formData.append("logo", compressedLogo);

      await axios.post(
        "http://localhost:3000/api/company/onboarding",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // If needed for credentials
        }
      );

      toast.success("Success! 🎉", {
        description: "Onboarding process completed successfully.",
        classNames: {
          icon: "text-teal-800",
          title: "text-teal-800",
          description: "text-teal-800",
          bg: "bg-teal-100",
        },
      });

      dispatch(
        setCredentials({
          ...userInfo,
          done_onboarding: true,
        })
      );
      window.location.reload();
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      const errorMsg =
        error.response?.data?.errors?.[0]?.msg ??
        error.response?.data?.message ??
        error.response?.data?.error ??
        "An unexpected error occurred while processing your request. Please try again later or contact support if the issue persists.";

      toast.error("Oops! Failed to register.", {
        description: errorMsg,
        classNames: {
          icon: "text-red-800",
          title: "text-red-800",
          description: "text-red-800",
          bg: "bg-teal-100",
        },
      });
    }
  };

  useEffect(() => {
    if (userInfo?.account_type === "company") {
      userInfo.done_onboarding === true
        ? navigate("/company/jobs")
        : navigate("/company/onboarding");
    }
  }, [userInfo, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <Label>Company Address</Label>
          <Input
            placeholder="Company Name"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <p className="text-red-400 text-sm">This Field is Required</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label>Company Contact Number</Label>
          <Input
            onKeyPress={(e) => !/^[0-9]$/.test(e.key) && e.preventDefault()}
            placeholder="123456"
            maxLength="11"
            minLength="11"
            {...register("contact_no", { required: true })}
          />
          {errors.contact && (
            <p className="text-red-400 text-sm">This Field is Required</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label>Company Email Address</Label>
          <Input
            placeholder="j.delacruz.123456@business.com"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-400 text-sm">This Field is Required</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label>Company Industry</Label>
          <Select onValueChange={handleIndustryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Industries</SelectLabel>
                {industries.map((industry) => (
                  <SelectItem
                    key={industry.industry_id}
                    value={industry.industry_name}
                  >
                    {industry.industry_name}
                  </SelectItem>
                ))}
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {isOtherSelected && (
            <Input
              placeholder="Enter your industry"
              className="mt-2"
              {...register("otherIndustry", { required: isOtherSelected })}
            />
          )}
        </div>

        <div className="sm:col-span-2">
          <Label>Company Logo</Label>
          <Input
            type="file"
            accept="image/*"
            {...register("logo", { required: true })}
          />
          {errors.logo && (
            <p className="text-red-400 text-sm">This Field is Required</p>
          )}
        </div>
        <div className="sm:col-span-2"></div>
      </div>
      <Button type="submit" className="mt-4 sm:mt-6 w-full">
        Submit
      </Button>
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
  );
};

export default OnboardingForm;
