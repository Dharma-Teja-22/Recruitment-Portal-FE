import { useEffect, useState } from "react";
import APIs from "../APIs";
import Sidenav from "./Sidenav";
import { useNavigate } from "react-router-dom";

interface Job {
  job_id: number;
  title: string;
  description: string;
  salary: number;
  location: string;
  job_type: string;
  experience_level: string;
  skills: string;
  status: string;
}

function FetchJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    APIs.get.fetchJobData()
      .then((res) => {
        setJobs(res);
        console.log(res);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      });
  }, []);

  const handleOpenApplicationForm = (job: Job) => {
    if (job.status !== "Closed") {
      localStorage.setItem("selectedJobTitle", job.title);
      localStorage.setItem("selectedJobId", job.job_id.toString());
      navigate(`/applyjob/${job.job_id}`, { state: { job_id: job.job_id } });
    }
  };

  return (
    <div className="w-screen shadow-2xl">
      <Sidenav /><br />
      <div className="flex items-center ml-8 ">
        <button onClick={() => navigate(-1)} className="text-4xl text-blue-500 hover:text-blue-600 transition">
          ← 
        </button>
      </div>
      <div className="container grid shadow-2xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-4 pt-2 pb-2">
        {jobs.length === 0 ? (
          <p>Loading jobs...</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.job_id}
              className="bg-white shadow-2xl rounded-lg overflow-hidden"
            >
              <div className="p-6"> 
                <h2 className="text-xl font-bold mb-2 text-center text-cyan-900 ">
                   {job.title}
                </h2>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-900">
                    ${job.salary.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">{job.location}</span>
                </div>
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    {job.experience_level}
                  </span>
                  <span className="text-sm text-gray-500">{job.job_type}</span>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Skills:
                  </h3>
                  <p className="text-sm text-gray-600">{job.skills}</p>
                </div> 
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : job.status === "Closed"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenApplicationForm(job)}
                  disabled={job.status === "Closed"}
                  className={`w-full pt-3 py-2 rounded-md font-semibold transition duration-300 ${
                    job.status === "Closed" 
                      ? "bg-gray-400 text-white cursor-not-allowed" 
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FetchJobs;
