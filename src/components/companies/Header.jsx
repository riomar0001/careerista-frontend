import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, LifeBuoy } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import { useCompanyLogoutMutation } from "@/Redux/slices/usersApiSlice";
import { logout } from "@/Redux/slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useCompanyLogoutMutation();

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const logoutHandler = async () => {
    try {
      clearLocalStorage();
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/company/login");
    } catch (err) {
      console.error(err);
    }
  };

  
  return (
    <header className="sticky flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px]">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="me-5 lg:me-0 lg:hidden">
          {/* <!-- Logo --> */}
          <a
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
            href="#"
          >
            <h1 className="text-2xl font-bold">Careerista</h1>
          </a>
          {/* <!-- End Logo --> */}
        </div>

        <div className="w-full flex items-center justify-end ms-auto gap-x-1 md:gap-x-3">
          <div className="flex flex-row items-center justify-end gap-1">
            {/* <!-- Dropdown --> */}
            <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="flex items-center text-base gap-3 hover:underline">
                    <a href="" className="hidden sm:block text-xl font-semibold uppercase">
                      {userInfo?.company_name} {userInfo?.last_name}
                    </a>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-10 md:mr-6 sm:mr-auto">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
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
              {/* <!-- End Dropdown --> */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
