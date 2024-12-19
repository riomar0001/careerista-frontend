import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, FileUser } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

const CompanyProfile = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyEmailAddress, setCompanyEmailAddress] = useState("");
  const [companyContactNumber, setCompanyContactNumber] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch company data
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/company", {
          withCredentials: true, // Include credentials (cookies)
        });

        const companyData = response.data.company;
        setCompanyLogo(companyData.logo);
        setCompanyName(companyData.company_name);
        setCompanyIndustry(companyData.industries[0].industry_name);
        setCompanyDescription(companyData.description);
        setCompanyAddress(companyData.address);
        setCompanyEmailAddress(companyData.contact.email);
        setCompanyContactNumber(companyData.contact.contact_no);
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
                      <form action="">
                        <div className="flex flex-col text-left gap-y-5">
                          <div className="flex flex-row items-center gap-x-5">
                            <Avatar>
                              <AvatarImage src={companyLogo} />
                              <AvatarFallback>
                                {companyName.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm text-gray-800">
                                Company Name
                              </p>
                              <Input
                                className="font-semibold"
                                value={companyName}
                              />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-800">
                              Company Industry
                            </p>
                            <p className="font-semibold">
                              <Input value={companyIndustry} />
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-800">
                              Company Description
                            </p>
                            <Textarea
                              value={companyDescription}
                              className="h-32"
                            />
                          </div>
                          <Separator className="mt-7" />
                          <div>
                            <p className="text-sm text-gray-800">
                              Company Address
                            </p>
                            <Input value={companyAddress} className="w-full" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-800">
                              Company Email Address
                            </p>
                            <Input
                              value={companyEmailAddress}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-gray-800">
                              Company Contact Number
                            </p>
                            <Input
                              value={companyContactNumber}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </form>
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
                  <Button>
                    <FileUser size={16} />
                    Save
                  </Button>
                  <Button variant="outline">
                    <Link to="/company/profile" className="w-full">
                      <span className="inline-flex items-center gap-2">
                        <Pencil size={16} />
                        <p className="text-sm">Cancel Edit</p>
                      </span>
                    </Link>
                  </Button>
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
