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
import { Textarea } from "@/components/ui/textarea";

const UpdateCompanyInfo = () => {
  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(
        "http://localhost:3000/api/company/update",
        { company_name: companyName, description },
        { withCredentials: true }
      );
      alert("Company details updated successfully!");
      setOpen(false);
      //reload page
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update company details. Please try again.");
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
        Update Company Details
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Company Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              disabled={loading}
            />
            <Textarea
              placeholder="Enter company description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <Button onClick={handleSubmit} disabled={loading || !companyName}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCompanyInfo;
