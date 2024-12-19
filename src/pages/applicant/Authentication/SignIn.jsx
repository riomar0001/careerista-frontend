import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

//Import Redux Toolkit
import { useDispatch, useSelector } from "react-redux";
import { useApplicantLoginMutation } from "@/Redux/slices/usersApiSlice.js";
import { setCredentials } from "@/Redux/slices/authSlice.js";

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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useApplicantLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email_username: email, password }).unwrap();
      dispatch(setCredentials({ ...res }));

      toast.success("Login Successful!", {
        description: "You've successfully logged in.",
        classNames: {
          icon: "text-teal-800",
          title: "text-teal-800",
          description: "text-teal-800",
          bg: "bg-teal-100",
        },
      });
    } catch (error) {
      return toast.error("Login Failed!", {
        description: error.data?.error || "Login error occurred",
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
    if (userInfo?.account_type === "applicant") {
      userInfo.done_onboarding ? navigate("/") : navigate("/applicant/onboarding");
    }
  }, [userInfo, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[500px] py-5 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-bold">Sign In</CardTitle>
          <CardDescription className="text-black">
            Welcome! Sign In to Explore Opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-5">
              <div className="flex flex-col space-y-1.5">
                <Label>Username or Email</Label>
                <Input
                  placeholder="Username or Email"
                  id="email"
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Password</Label>
                <Input
                  placeholder="Password"
                  id="password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full">Login</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            Don't have an account yet?
            <Link to="/applicant/signup" className="font-bold hover:underline">
              {" "}
              Sign up here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
