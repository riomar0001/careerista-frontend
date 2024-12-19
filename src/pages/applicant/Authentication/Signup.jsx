import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
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

import { useDispatch, useSelector } from "react-redux";
import { useApplicantRegisterMutation } from "@/Redux/slices/usersApiSlice";
import { setCredentials } from "@/Redux/slices/authSlice";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useApplicantRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.account_type === "applicant") {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }).unwrap();

      dispatch(setCredentials(res));

      toast.success("Sign Up Successful!", {
        description: "Your account has been created successfully.",
        classNames: {
          icon: "text-teal-800",
          title: "text-teal-800",
          description: "text-teal-800",
          bg: "bg-teal-100",
        },
      });

      navigate("/applicant/onboarding"); // Redirect to home page after signup
    } catch (error) {
      console.log(error.data);

      toast.error("Sign Up Failed!", {
        description: error.data?.error || "An error occurred while signing up.",
        classNames: {
          icon: "text-red-800",
          title: "text-red-800",
          description: "text-red-800",
          bg: "bg-red-100",
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[500px] py-5 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-bold">Sign Up</CardTitle>

          <CardDescription className="text-black">
            Create Your Account and Land Your Dream Job
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-5">
              <div className="flex flex-col space-y-1.5">
                <Label>Username</Label>
                <Input
                  placeholder="Enter your Username"
                  id="username"
                  type="username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Email</Label>
                <Input
                  placeholder="Enter your Email"
                  id="email"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>First Name</Label>
                <Input
                  placeholder="Enter your First Name"
                  id="firstName"
                  type="firstName"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Last Name</Label>
                <Input
                  placeholder="Enter your Last Name"
                  id="lastName"
                  type="lastName"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Password</Label>
                <Input
                  placeholder="Enter your Password"
                  id="password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            Already have an account?{" "}
            <Link to="/applicant/signin" className="font-bold hover:underline">
              Sign in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
