import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateAccountEmailDialog = ({ current_email }) => {
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleUpdateEmail = async () => {
    if (!newEmail) {
      setError("Please provide a new email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:3000/api/company/email",
        { new_email: newEmail },
        { withCredentials: true }
      );
      alert("Email updated successfully");
      setOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Update Account Email</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Account Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Current Account Email</p>
              <p className="font-semibold">{current_email}</p>
            </div>
            <div>
              <Label htmlFor="email">New Email Address</Label>
              <Input
                id="email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateEmail}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateAccountEmailDialog;
