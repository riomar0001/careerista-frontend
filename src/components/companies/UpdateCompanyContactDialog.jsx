import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UpdateCompanyContactDialog = () => {
  const [open, setOpen] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(
        "http://localhost:3000/api/company/contact",
        { contact_no: contactNo, email },
        { withCredentials: true }
      );
      alert("Contact information updated successfully!");
      setOpen(false);

      //relaod the page
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update contact information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="link"
        className="text-neutral-500"
      >
        Update Contact Info
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Contact Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter new contact number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              disabled={loading}
            />
            <Input
              type="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => setOpen(false)}
              variant="secondary"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || (!contactNo && !email)}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCompanyContactDialog;
