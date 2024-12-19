import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "../components/companies/Header";
import Sidebar from "../components/companies/Sidebar";
import Breadcrum from "@/components/companies/Breadcrum";

const CompanyDashboardLayout = () => {

  
  return (
    <div className="bg-gray-50">
      {/* <AuthCheck /> */}
      <Header />
      <Sidebar />
      <Breadcrum />
      <Outlet />
    </div>
  );
};

export default CompanyDashboardLayout;
