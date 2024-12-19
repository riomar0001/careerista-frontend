import React from "react";
import Hero from "@/components/applicants/home/Hero";
import TrustedCompanies from "@/components/applicants/home/TrustedCompanies";
import LatestJob from "@/components/applicants/home/LatestJob";
import DreamCompany from "@/components/applicants/home/DreamCompany";
import Footer from "@/components/applicants/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <TrustedCompanies />
      <LatestJob />
      {/* <DreamCompany /> */}
    </div>
  );
};

export default Home;
