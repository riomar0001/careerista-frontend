import React from "react";

import { Separator } from "@/components/ui/separator";
import OnboardingForm from "@/components/companies/OnboardingForm";

const CompanyOnboarding = () => {
  return (
    <div className="w-full h-full lg:ps-64">
      <div className="p-2 sm:p-6 space-y-4 sm:space-y-6">
        <div className="max-w-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-5 mx-auto">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden pt-2">
                  <div className="px-6 py-4 flex flex-col border-gray-200">
                    <div className="flex flex-col items-center space-y-2 mt-8">
                      <h2 className="text-2xl font-bold tracking-tight">
                        Company Onboarding
                      </h2>
                      <p className="text-muted-foreground mt-3 text-gray-600">
                        Welcome to the onboarding process. Please fill in the
                        form below to complete your onboarding process.
                      </p>
                    </div>
                    <Separator className="mt-8" />

                    <section className="bg-white">
                      <div className="py-8 mx-auto max-w-2xl lg:py-16">
                        <OnboardingForm />
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOnboarding;
