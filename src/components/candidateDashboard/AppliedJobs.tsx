import React, { useEffect, useState } from "react";
import APIs from "../APIs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Job {
  job_id: number;
  title: string;
  description: string;
  salary: string;
  location: string;
  job_type: string;
  experience_level: string;
  skills: string;
  application_deadline: string;
  status: string;
  manager_id: number;
}

const AppliedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusMessages, setStatusMessages] = useState<{ [key: number]: string }>({});
  const [loadingJobId, setLoadingJobId] = useState<number | null>();
  const candidateId = localStorage.getItem("candidateId");
  const navigate = useNavigate();

  useEffect(() => {
    if (candidateId) {
      APIs.post
        .fetchCandidateJobs(Number(candidateId))
        .then((data) => {
          setJobs(data);
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
        });
    }
  }, [candidateId]);

  const fetchJobStatus = async (jobId: number) => {
    if (candidateId) {
      try {
        setLoadingJobId(jobId);
        localStorage.setItem("jobId", String(jobId));
        const response = await APIs.post.jobStatus({
          candidate_id: Number(candidateId),
          job_id: jobId,
        });
        setStatusMessages((prev) => ({ ...prev, [jobId]: response }));
        setLoadingJobId(null);

        if (response === "Pending") {
          toast.info(response);
        } else if (response.includes("Interview") || response.includes("Selected") || response.includes("Rejected"))  {
          toast.success(response);
        }
      } catch (error) {
        console.error("Error fetching job status:", error);
        setStatusMessages((prev) => ({ ...prev, [jobId]: "Error fetching job status." }));
        setLoadingJobId(null);
      }
    }
  };

  const handleInterviewDetails = (jobId: number) => {
    navigate('/interview-details');
    toast.info(`Fetching interview details for job ID: ${jobId}`);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center ml-4">
        <button onClick={() => navigate(-1)} className="text-2xl text-blue-500 hover:text-blue-600 transition">
          ← 
        </button>
      </div>
      <div className="container mx-auto">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-6 text-center">Applied Jobs</h1>
        {jobs.length > 0 ? (
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-3 border-b-2 border-gray-200 text-xs font-bold text-gray-600 text-center tracking-wider">Job Title</th>
                <th className="px-4 py-3 border-b-2 border-gray-200 text-center text-xs font-bold text-gray-600 tracking-wider">Description</th>
                <th className="px-4 py-3 border-b-2 border-gray-200 text-center text-xs font-bold text-gray-600 tracking-wider">Salary</th>
                <th className="px-4 py-3 border-b-2 border-gray-200 text-center text-xs font-bold text-gray-600 tracking-wider">Location</th>
                <th className="px-4 py-3 border-b-2 border-gray-200 text-center text-xs font-bold text-gray-600 tracking-wider">Application Deadline</th>
                <th className="px-4 py-3 border-b-2 border-gray-200 text-center text-xs font-bold text-gray-600 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.job_id} className="hover:bg-gray-100">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">{job.title}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{job.description}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-500">${job.salary}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-500">{job.location}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {new Date(job.application_deadline).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    {job.status === "In-Progress" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInterviewDetails(job.job_id);
                        }}
                        className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 w-36"
                      >
                        Interview Details
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!loadingJobId) {
                            fetchJobStatus(job.job_id);
                          }
                        }}
                        className={`px-4 py-2 rounded flex justify-center items-center w-36 ${
                          statusMessages[job.job_id] === "Error fetching job status."
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        } text-white`}
                        disabled={loadingJobId === job.job_id || statusMessages[job.job_id]?.includes("Interview")}
                      >
                        {loadingJobId === job.job_id ? (
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0010 10v-4a6 6 0 01-6-6H2z"
                            ></path>
                          </svg>
                        ) : statusMessages[job.job_id] ? (
                          statusMessages[job.job_id] === "Error fetching job status."
                            ? "Error"
                            : statusMessages[job.job_id]
                        ) : (
                          "Check Status"
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No applied jobs found.</p>
        )}
        {Object.keys(statusMessages).length > 0 && (
          <div className="mt-4 text-center text-gray-700">
            <h1>{(loadingJobId !== null && loadingJobId !== undefined) && statusMessages[loadingJobId]}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
