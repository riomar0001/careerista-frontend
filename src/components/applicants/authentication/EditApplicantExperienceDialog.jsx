  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { toast } from "sonner";

  import { UserPen } from "lucide-react";

  import React, { useState } from "react";
  import axios from "axios";

  const EditApplicantExperienceDialog = ({ exp }) => {
    const [company, setCompany] = useState(exp.company);
    const [position, setPosition] = useState(exp.position);
    const [address, setAddress] = useState(exp.address);
    const [yearsOfStay, setYearsOfStay] = useState(exp.years_of_stay);

    const [isOpen, setIsOpen] = useState(false);

    const handleSaveChanges = async (e) => {
      console.log(exp.experience_id);
      e.preventDefault();
      try {
        const response = await axios.put(
          `http://localhost:3000/api/applicant/experience/${exp.experience_id}`,
          {
            company,
            position,
            address,
            years_of_stay: yearsOfStay,
          },
          {
            withCredentials: true,
          }
        );
        toast.success("Update Successful!", {
          description:
            response.data.message || "Experience Updated successfully.",
          classNames: {
            icon: "text-teal-800",
            title: "text-teal-800",
            description: "text-teal-800",
            bg: "bg-teal-100",
          },
        });

        setIsOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000 );
      } catch (err) {
        console.log(err);

        toast.error("Update Failed!", {
          description:
            err.response?.data?.error || "An error occurred while updating.",
          classNames: {
            icon: "text-red-800",
            title: "text-red-800",
            description: "text-red-800",
            bg: "bg-red-100",
          },
        });
      }
    };

    const handleDeleteExperience = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/applicant/experience/${exp.experience_id}`,  
          {
            withCredentials: true,
          }
        );
        toast.success("Deleted Successful!", {
          description:
            response.data.message || "Experience deleted successfully.",
          classNames: {
            icon: "text-teal-800",
            title: "text-teal-800",
            description: "text-teal-800",
            bg: "bg-teal-100",
          },
        });
        setIsOpen(false);
        window.location.reload();
      } catch (err) {
        toast.error("Delete Failed!", {
          description:
            err.response?.data?.error || "An error occurred while deletings.",
          classNames: {
            icon: "text-red-800",
            title: "text-red-800",
            description: "text-red-800",
            bg: "bg-red-100",
          },
        });
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="link" size="sm">
            <UserPen /> Edit Work Experience
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Work Experience</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveChanges}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Company
                </Label>
                <Input
                  className="col-span-3"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-left">
                  Address
                </Label>
                <Input
                  className="col-span-3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-left">
                  Position
                </Label>
                <Input
                  className="col-span-3"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-left">
                  Years of Stay
                </Label>
                <Input
                  className="col-span-3"
                  value={yearsOfStay}
                  onChange={(e) => setYearsOfStay(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </form>
          <DialogFooter>
            <Button
              onClick={handleDeleteExperience}
              className="w-full"
              variant="destructive"
            >
              Delete Experience
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  export default EditApplicantExperienceDialog;
