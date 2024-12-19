//Import React Libraries
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

//Import Redux Toolkit
import { useDispatch, useSelector } from "react-redux";
import { useCompanyRegisterMutation } from "@/Redux/slices/usersApiSlice.js";
import { setCredentials } from "@/Redux/slices/authSlice.js";

//Import React Router
import { Link, useNavigate } from "react-router-dom";

//Import UI Components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useCompanyRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register({
        email,
        company_name: companyName,
        description: companyDescription,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));

      toast.success("Registration Successful!", {
        description: "You've successfully registered.",
        classNames: {
          icon: "text-teal-800",
          title: "text-teal-800",
          description: "text-teal-800",
          bg: "bg-teal-100",
        },
      });
    } catch (error) {
      return toast.error("Registration Failed!", {
        description: error.data?.error || "Registration error occurred",
        classNames: {
          icon: "text-red-800",
          title: "text-red-800",
          description: "text-red-800",
          bg: "bg-red-100",
        },
      });
    }
  };

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.account_type === "company") {
      userInfo?.done_onboarding
        ? navigate("/company/dashboard")
        : navigate("/company/onboarding");
    }
  }, [userInfo, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="border border-gray-200 rounded-xl h-screen w-screen lg:h-auto lg:w-auto pt-32 lg:pt-0 shadow-lg self-center">
          <CardHeader className="space-y-1 my-5">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Register your company account to get started and unlock new career
              opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your company email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="email">
                Company Name
              </Label>
              <Input
                id="email"
                type="text"
                name="email"
                placeholder="Company Name"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="email">
                Company Description
              </Label>
              <Textarea
                placeholder="Type your company description here."
                onChange={(e) => setCompanyDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </CardFooter>
          <CardFooter>
            <p>
              Already have an account?{" "}
              <Link
                to="/company/login"
                className="font-bold hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default RegistrationPage;
