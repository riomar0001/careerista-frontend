import React from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const Hero = () => {
  return (
    <div
      className="bg-[#F8E968] flex justify-center bg-[url('/Union.svg')] bg-no-repeat bg-top py-60"
      style={{
        backgroundPosition: "top 83px center", // Adjust background position (acts like margin)
      }}
    >
      <div className="flex flex-col items-center z-10">
        <p className="text-[#10141D] font-clash-display text-xl">
          #1 PLATFORM FOR JOBS
        </p>
        <div className="mt-5 max-w-5xl text-center mx-auto">
          <h1 className="block font-bold text-4xl md:text-5xl lg:text-6xl font-clash-display">
            Browse exciting opportunities and discover the dream job that's
            perfect for you.
          </h1>
        </div>

        <div className="mt-5 max-w-4xl text-center mx-auto">
          <p className="text-lg font-clash-display">
            Embark on a journey towards your dream career, your ultimate
            job-finding companion! We've curated a platform that connects
            talented individuals with exciting opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
