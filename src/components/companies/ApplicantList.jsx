import { useEffect, useState } from "react";
import axios from "axios";
import ApplicantCard from "./ApplicantsCard";

const ApplicantList = ({ id }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/job/applicants/${id}`,
          { withCredentials: true }
        );
        setApplicants(response.data.applicants);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError("No applicants found.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div className="flex flex-col gap-y-5">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && applicants.length === 0 && (
        <p>No applicants found.</p>
      )}

      {/* Render ApplicantCard dynamically */}
      {!loading &&
        !error &&
        applicants.map((applicant) => (
          <ApplicantCard key={applicant.applicant_id} applicant={applicant} />
        ))}
    </div>
  );
};

export default ApplicantList;
