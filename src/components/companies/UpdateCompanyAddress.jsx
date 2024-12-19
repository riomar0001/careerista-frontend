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

const UpdateCompanyAddress = () => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(
        "http://localhost:3000/api/company/address",
        { address },
        {
          withCredentials: true,
        }
      );
      alert("Address updated successfully!");
      setOpen(false);
      //reload page
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update address. Please try again.");
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
        Update Address
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle >Update Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your new address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            <Button onClick={handleSubmit} disabled={loading || !address}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCompanyAddress;
