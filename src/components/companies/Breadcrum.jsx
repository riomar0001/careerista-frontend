import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideBarContent from "./SideBarContent";

const Breadcrum = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
      <div className="flex items-center py-2">
        {/* <!-- Navigation Toggle --> */}
        <Sheet
          className="mt-[-200px]"
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
        >
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader className="p-0 m-0 mt-0 mb-0 mr-0 ml-0 mx-0 my-0">
              <SheetTitle className="p-0 m-0 mt-0 mb-0 mr-0 ml-0 mx-0 my-0"></SheetTitle>
              <SheetDescription className="p-0 m-0 mt-0 mb-0 mr-0 ml-0 mx-0 my-0"></SheetDescription>
            </SheetHeader>
            <SideBarContent closeSheet={closeSheet} />
          </SheetContent>
        </Sheet>
        {/* <!-- End Navigation Toggle --> */}

        {/* <!-- Breadcrumb --> */}
        <ol className="ms-3 flex items-center whitespace-nowrap">
          <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
            Application Layout
            <svg
              className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </li>
          <li
            className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
            aria-current="page"
          >
            Dashboard
          </li>
        </ol>
        {/* <!-- End Breadcrumb --> */}
      </div>
    </div>
  );
};

export default Breadcrum;
