//Import React and Other Libraries
import React from "react";

//Import Utilities
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

//Import Icons
import {
  House,
  UsersRound,
  BriefcaseBusiness,
  ListPlus,
  Wallet,
  UserRoundCog,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const SideBarContent = ({ closeSheet }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const isDoneOnboarding = userInfo?.done_onboarding;

  return (
    <div className="relative flex flex-col h-full max-h-full">
      <div className="flex items-center justify-center px-6 py-3 sm:py-6">
        {/* <!-- Logo --> */}
        <Link
          to={isDoneOnboarding ? "/company/dashboard" : "/company/onboarding"}
          className="flex-none rounded-xl text-xl inline-block font-semibold"
          href="#"
          aria-label="Preline"
        >
          <h1 className="text-2xl font-bold">Careerista</h1>
        </Link>
        {/* <!-- End Logo --> */}
      </div>

      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <nav className="w-auto flex flex-col flex-wrap mt-2 lg:mx-2 md:mx-0">
          <ul className="space-y-2">
            {isDoneOnboarding ? (
              <>
                {/* <li>
                  <Link to="/company/dashboard">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal"
                      onClick={closeSheet}
                    >
                      <House className="mr-2" size={16} />
                      Home
                    </Button>
                  </Link>
                </li> */}

                <li>
                  <Link to="/company/jobs">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal"
                      onClick={closeSheet}
                    >
                      <BriefcaseBusiness className="mr-2" size={16} />
                      Jobs
                    </Button>
                  </Link>
                </li>

                <li>
                  <Link to="/company/jobs/add">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal"
                      onClick={closeSheet}
                    >
                      <ListPlus className="mr-2" size={16} />
                      Add Job
                    </Button>
                  </Link>
                </li>

                <li>
                  <Link to="/company/profile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal"
                      onClick={closeSheet}
                    >
                      <UsersRound className="mr-2" size={16} />
                      Profile
                    </Button>
                  </Link>
                </li>

              </>
            ) : (
              <li>
                <Link to={"/company/onboarding"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base font-normal"
                    onClick={closeSheet}
                  >
                    <House className="mr-2" size={16} />
                    Onboarding
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBarContent;
