import { Outlet } from "react-router";
import Navbar from "@/components/applicants/Navbar";
import Footer from "@/components/applicants/Footer";


const ApplicantLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ApplicantLayout;
