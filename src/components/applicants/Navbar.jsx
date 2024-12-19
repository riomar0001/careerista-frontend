import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useApplicantLogoutMutation } from "@/Redux/slices/usersApiSlice";
import { logout } from "@/Redux/slices/authSlice";

import { toast } from "sonner";

import { LifeBuoy, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useApplicantLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="z-50 absolute top-0 left-0 bg-transparent w-full bg-[#F8E968]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mt-3">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-3xl font-semibold whitespace-nowrap font-clash-display">
            Careerista
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-2 rtl:space-x-reverse">
          {userInfo?.account_type ==="applicant" ? (
            <DropdownMenu className="top-0">
              <DropdownMenuTrigger asChild>
                <span className="flex items-center text-base gap-3">
                  <Button type="button" variant="ghost">
                    <p className="text-xl">{userInfo?.name}</p>
                  </Button>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-10 md:mr-6 sm:mr-auto">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/applicant/profile"
                      className="py-2 cursor-pointer font-medium"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/"
                    className="py-2 cursor-pointer font-medium"
                    onClick={logoutHandler}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                to="/applicant/signin"
                className="border border-[#10141D] md:px-5 md:py-3 p-2 rounded-md font-clash-display font-semibold hover:text-black/90 "
              >
                Sign In
              </Link>
              <Link
                to="/applicant/signup"
                className="bg-[#10141D] text-white md:px-5 md:py-3 p-2 rounded-md font-clash-display font-semibold hover:bg-[#10141D]/90"
              >
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-3 w-10 h-10 justify-center text-smrounded-lg md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block " : "hidden"
          }`}
        >
          <ul className="flex flex-col text-xl font-poppins md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <Link
                to="/find-jobs"
                className="block py-2 px-3 text-[#10141D] rounded md:bg-transparent md:p-0"
                aria-current="page"
              >
                Find Jobs
              </Link>
            </li>
            {/* <li>
              <Link
                to="find-company"
                className="block py-2 px-3 text-[#10141D] rounded md:bg-transparent md:p-0"
                aria-current="page"
              >
                Company
              </Link>
            </li> */}
            {userInfo?.account_type ==="applicant" ? (
              ""
            ) : (
              <li>
                <Link
                  to="/company/login"
                  className="block py-2 px-3 text-[#10141D] rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Employer Site
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
