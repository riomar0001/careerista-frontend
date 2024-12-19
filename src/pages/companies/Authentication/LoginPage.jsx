//Import React Libraries
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

//Import Redux Toolkit
import { useDispatch, useSelector } from "react-redux";
import { useCompanyLoginMutation } from "@/Redux/slices/usersApiSlice.js";
import { setCredentials } from "@/Redux/slices/authSlice.js";

//Import React Router
import { Link, useNavigate } from "react-router-dom";

//Import UI Components
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useCompanyLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
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
            <CardTitle className="text-2xl text-center">
              Sign In to Careerista
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign in to your account
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
                placeholder="j.delacruz.123456@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label className="text-base" htmlFor="password">
                  Password
                </Label>
              </div>
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
              Sign In
            </Button>
          </CardFooter>
          <CardFooter>
            <p>
              Don't have an account yet?
              <Link
                to="/company/registration"
                className="font-bold hover:underline"
              >
                {" "}
                Sign up here
              </Link>
            </p>
          </CardFooter>
          <CardFooter>
            <p className="mt-5">
              Are you a job seeker?
              <Link
                to="/applicant/signin"
                className="font-bold hover:underline tex"
              >
                {" "}
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default LoginPage;
