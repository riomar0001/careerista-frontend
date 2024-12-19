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
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useApplicantLogoutMutation } from "@/Redux/slices/usersApiSlice";
import { logout } from "@/Redux/slices/authSlice";

const DeleteApplicantDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useApplicantLogoutMutation();

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/applicant`, {
        withCredentials: true,
      });
      alert("Company deleted successfully!");
      setOpen(false);

      clearLocalStorage();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to delete company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Account
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this Account? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteApplicantDialog;
