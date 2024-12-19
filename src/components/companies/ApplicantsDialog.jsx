import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ApplicantDetailsDialog = ({ applicant }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default">View Applicant Details</Button>
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
              <strong>Full Name:</strong> {applicant.first_name} {applicant.last_name}
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
            <a
              href={applicant.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              View CV
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantDetailsDialog;
