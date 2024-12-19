import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, FileUser } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import UpdateCompanyContactDialog from "@/components/companies/UpdateCompanyContactDialog";
import UpdateCompanyAddress from "@/components/companies/UpdateCompanyAddress";
import UpdateCompanyIndustry from "@/components/companies/UpdateCompanyIndustry";
import UpdateCompanyInfo from "@/components/companies/UpdateCompanyInfo";
import UpdatePasswordDialog from "@/components/companies/UpdatePasswordDialog";
import DeleteCompanyDialog from "@/components/companies/DeleteCompanyDialog";
import UpdateAccountEmailDialog from "@/components/companies/UpdateAccountEmailDialog";
import axios from "axios";

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch company data
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/company", {
          withCredentials: true, // Include credentials (cookies)
        });
        setCompanyData(response.data.company);
      } catch (err) {
        setError("Failed to fetch company data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full h-full lg:ps-64">
      <div className="p-2 sm:p-6 space-y-4 sm:space-y-6 border">
        <div className="max-w-auto px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid gap-7 py-5 px-1 lg:py-5 grid-cols-1 md:grid-cols-7 sm:gap-6">
            <div className="-m-1.5 overflow-x-auto md:col-span-5 shadow-md rounded-xl">
              <div className="bg-white border border-gray-200 overflow-hidden pt-2">
                <div className="px-6 py-4 flex flex-col border-gray-200">
                  <div className="flex flex-col space-y-2 mt-3 px-4 sm:px-7">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Company Profile
                    </h2>
                    <p className="text-muted-foreground mt-3 text-gray-600">
                      View the company profile below.
                    </p>
                  </div>
                  <Separator className="mt-7" />
                  <div className="bg-white">
                    <div className="p-4 sm:p-7 overflow-y-auto">
                      <div className="flex flex-col text-left gap-y-5">
                        <div className="flex flex-row justify-between items-center gap-x-5">
                          <div >
                            <p className="text-sm text-gray-500">
                              Company Industry
                            </p>
                            <p className="font-semibold">
                              {companyData.industries[0].industry_name}
                            </p>
                          </div>
                          <UpdateCompanyIndustry />
                        </div>
                        <Separator className="mt-3" />
                        <div className="flex flex-row items-center gap-x-5">
                          <Avatar>
                            <AvatarImage src={companyData.logo} />
                            <AvatarFallback>
                              {companyData.company_name
                                .slice(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm text-gray-500 w-full flex justify-between flex-row items-center">
                              <p>Comapany Name</p>
                              <UpdateCompanyInfo />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800">
                              {companyData.company_name}
                            </h3>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">
                            Company Description
                          </p>
                          <p className="font-semibold">
                            {companyData.description}
                          </p>
                        </div>
                        <Separator className="mt-7" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Company Address
                          </p>
                          <p className="font-semibold flex items-center justify-between">
                            {companyData.address}
                            <UpdateCompanyAddress />
                          </p>
                        </div>
                        <Separator className="mt-7" />

                        <div className="flex flex-row justify-between gap-y-5">
                          <div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Company Email Address
                              </p>
                              <p className="font-semibold">
                                {companyData.contact.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Company Contact Number
                              </p>
                              <p className="font-semibold">
                                {companyData.contact.contact_no}
                              </p>
                            </div>
                          </div>
                          <UpdateCompanyContactDialog />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="-m-1.5 overflow-x-auto md:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                <div className="flex flex-col space-y-2 mt-3 px-5 sm:px-6">
                  <h2 className="text-base font-bold tracking-tight">
                    Actions
                  </h2>
                  <p className="text-muted-foreground text-gray-600">
                    Perform actions on the member below.
                  </p>
                  <Separator className="mt-2" />
                </div>
                <div className="px-6 py-4 flex flex-col border-gray-200 gap-y-2">
                  <UpdateAccountEmailDialog current_email={companyData.email} />
                  <UpdatePasswordDialog />
                </div>
                <div className="px-6 py-4 flex flex-col border-gray-200">
                  <Separator className="mb-6" />
                  <DeleteCompanyDialog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
