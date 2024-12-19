import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, FileUser } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ApplicantCard = ({ applicant }) => {
  console.log(applicant);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="hover:bg-gray-100 p-3 rounded-md cursor-pointer">
          <Card>
            <CardContent>
              <div className="mt-5 flex flex-col gap-y-3">
                <div className="flex flex-row gap-x-2">
                  <span className="font-semibold text-2xl">
                    Mario Jr Inguito
                  </span>
                </div>
                <div className="flex flex-row gap-x-2">
                  <Mail size={16} />
                  <span className="text-xs">inguitomario00@gmail.com</span>
                </div>
                <div className="flex flex-row gap-x-2">
                  <Phone size={16} />
                  <span className="text-xs">09292932986</span>
                </div>
                <div className="flex flex-row gap-x-2">
                  <FileUser size={16} />
                  <span className="text-xs">CV/Resume</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Applicant Details</DialogTitle>
          <DialogDescription>
            Review the applicant's information and access their CV.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Basic Information */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <Separator />
            <p>
              <strong>Full Name:</strong> {applicant.first_name}{" "}
              {applicant.last_name}
            </p>
            <p>
              <strong>Username:</strong> {applicant.username}
            </p>
            <p>
              <strong>Email:</strong> {applicant.email}
            </p>
            <p>
              <strong>Contact No:</strong> {applicant.contact?.contact_no}
            </p>
            <p>
              <strong>Alternate Email:</strong> {applicant.contact?.email}
            </p>
            <p>
              <strong>Account Created:</strong>{" "}
              {new Date(applicant.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <Separator />
            {applicant.experiences?.map((exp, index) => (
              <div key={index} className="p-2 border rounded-md">
                <p>
                  <strong>Company:</strong> {exp.company}
                </p>
                <p>
                  <strong>Address:</strong> {exp.address}
                </p>
                <p>
                  <strong>Position:</strong> {exp.position}
                </p>
                <p>
                  <strong>Years of Stay:</strong> {exp.years_of_stay} years
                </p>
              </div>
            ))}
          </div>

          {/* CV */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">CV Document</h3>
            <Separator />
            <p>Click the button below to view the applicant's CV.</p>
            <Button>
              <a href={applicant.cv} target="_blank" rel="noopener noreferrer" className="w-full">
                View CV
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantCard;
