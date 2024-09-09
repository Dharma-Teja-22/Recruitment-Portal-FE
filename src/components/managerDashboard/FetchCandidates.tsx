import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card'; 
import { useNavigate } from 'react-router-dom';
import APIs from '../APIs';

interface Candidate {
  candidate_id: number;
  first_name: string;
  last_name: string;
  email: string;
  resume_url: string | null;
  title: string | null;
  job_id: number;
}

const FetchCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const ManagerId = Number(localStorage.getItem("managerId"));
  const navigate = useNavigate();

  useEffect(() => {
    if (ManagerId) {
      APIs.put.FetchCandidates(ManagerId)
        .then((data) => {
          if (data.length > 0) {
            setCandidates(data);
          } else {
            console.log('No candidates found');
          }
        })
        .catch((error) => {
          console.error("Error fetching candidates:", error);
        });
    }
  }, [ManagerId]);

  const handleCardClick = (candidateId: number, jobId: number) => {
    localStorage.setItem('candidateData', JSON.stringify({ candidate_id: candidateId, job_id: jobId }));
    navigate(`/candidates/${candidateId}/${jobId}`);
  };

  if (candidates.length === 0) {
    return <div className="text-center p-6">No candidates available.</div>;
  }

  return (
    <>
    <div className="flex items-center mt-4 ml-4" >
        <button onClick={() => navigate(-1)} className="text-xl text-blue-500 hover:text-blue-600 transition">
          ← 
        </button>
       
      </div>
    <div className="h-full border-black flex flex-wrap justify-center p-6 gap-6">
      
      {candidates.map((candidate) => (
        <Card 
          key={candidate.candidate_id} 
          onClick={() => handleCardClick(candidate.candidate_id, candidate.job_id)}
          className="p-4 m-4 w-full sm:w-80 bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {candidate.first_name.charAt(0)}{candidate.last_name.charAt(0)}
              </span>
            </div>
            <h2 className="text-lg font-bold text-center mb-2">{`${candidate.first_name} ${candidate.last_name}`}</h2>
            <h2 className="text-lg font-bold text-center mb-2">Job Title: {`${candidate.title}`}</h2>
            <p className="text-center text-gray-600 mb-2">Email: {candidate.email}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              View Profile
            </button>
          </div>
        </Card>
      ))}
    </div>
    </>
  );
};

export default FetchCandidates;
