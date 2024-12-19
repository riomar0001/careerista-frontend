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
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditApplicantContactDialog = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/applicant", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.data;

        setContactNumber(data.contact[0].contact_no);
        setEmail(data.contact[0].contact_email);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApplicants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      contact_no: contactNumber,
      email,
    };

    try {
      const response = await axios.put(
        "http://localhost:3000/api/applicant/contact",
        updatedData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Update Successful!", {
        description:
          response.data.message ||
          "Your contact has been updated successfully.",
        classNames: {
          icon: "text-teal-800",
          title: "text-teal-800",
          description: "text-teal-800",
          bg: "bg-teal-100",
        },
      });
      setIsOpen(false);
      //refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 1000 );
    } catch (error) {
      toast.error("Update Failed!", {
        description:
          error.response?.data?.error || "An error occurred while updating.",
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
          <UserPen /> Edit Contact Information
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Contact Number</Label>
              <Input
                id="contact_number"
                className="col-span-3"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Email</Label>
              <Input
                id="email"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditApplicantContactDialog;
