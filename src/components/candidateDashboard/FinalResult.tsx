import React, { useEffect, useState } from "react";
import { Card } from "../ui/card"; // Adjust the import based on your file structure
import { FaDollarSign } from "react-icons/fa";
import APIs from "../APIs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Job {
  job_id: number;
  title: string;
  description: string;
  salary: string;
  status: string;
}

const AppliedJobs: React.FC = () => {
  const navigate  = useNavigate()
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [, setJobId] = useState<number | null>(null);
  const candidateId = localStorage.getItem("candidateId");
  useEffect(() => {
    if (candidateId) {
      APIs.post
        .fetchCandidateJobs(Number(candidateId))
        .then((data) => {
          setJobs(data);
          console.log(data)
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
        });
    }
  }, [candidateId]);

  const handleCardClick = (jobId: number) => {
    console.log(jobId);
    setJobId(jobId);
  };

  const fetchJobStatus = async (jobId: number) => {
    if (candidateId) {
      try {
        const data = {candidate_id: Number(candidateId), job_id: Number(jobId),}
        const response = await APIs.put.FinalInterviewResult(data);
        setStatusMessage(response);
        console.log(data)

        console.log(response.interview_result)
        if (response.interview_result === "Selected") {
          toast.success(response.interview_result);
        } else if (response === "Pending") {
          toast.success(response.interview_result);
        }
        else{
          toast.error("Rejected!");
        }
      } catch (error) {
        console.error("Error fetching job status:", error);
        setStatusMessage("Error fetching job status.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <ToastContainer />
        <div className="flex items-center ml-4">
          <button onClick={() => navigate(-1)} className="text-2xl text-blue-500 hover:text-blue-600 transition">
            ← 
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Check your Applications Job Status</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0  ? (
            jobs.filter(job => job.status === "Interview").map((job) => (
              <Card
                key={job.job_id}
                className="p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleCardClick(job.job_id)}
              >
                <h2 className="text-xl mb-2 font-bold text-center">
                  {job.title}
                </h2>
                <p className="text-gray-600 mb-4 text-justify">
                  {job.description}
                </p>
                <div className="flex items-center text-gray-800 mb-4">
                  <FaDollarSign className="mr-2" />
                  <span>${job.salary}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchJobStatus(job.job_id);
                  }}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Check Status
                </button>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">No applied jobs found.</p>
          )}
        </div>
        {statusMessage && (
          <div className="mt-4 text-center text-gray-700">
            {/* <h1>{statusMessage}</h1> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
