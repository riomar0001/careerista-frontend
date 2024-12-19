import React from "react";
import SideBarContent from "../companies/SidebarContent";

const Sidebar = () => {
  return (
    <div className="w-[260px] h-full hidden fixed inset-y-0 start-0 z-[50] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 border">
      <div className="relative flex flex-col h-full max-h-full">
        <SideBarContent />
      </div>
    </div>
  );
};

export default Sidebar;
