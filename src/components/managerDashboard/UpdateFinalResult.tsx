import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIs from '../APIs';
import { useNavigate } from 'react-router-dom';

interface Candidate {
  job_id: number;
  managerId: number;
  candidate_id: number;
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  status: string;
  interview_date: string;
  interview_result: string;
}

const UpdateFinalResult: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const managerId = Number(localStorage.getItem('managerId'));
  const navigate = useNavigate();

  useEffect(() => {
    APIs.put
      .FetchCandidatesInfo(managerId)
      .then((data) => {
        setCandidates(data);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
        toast.error('Failed to fetch candidates');
      });
  }, [managerId]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Interview':
        return 'text-green-600 bg-green-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleReject = (candidate_id: number, job_id: number, email: string, title: string) => {
    APIs.put
      .updateFinalResult({
        candidate_id: candidate_id, job_id: job_id, interview_result: 'Rejected', email: email,
        title: title,
        interview_date: ''
      })
      .then((res) => {
        if (res === "Unsuccessful. Due to the Interview Date is in past." || res === "Already candidate is rejected" || res === "Already Selected") {
          toast.warning(res);
        } else {
          toast.success('Candidate rejected successfully');
          setCandidates((prevCandidates) =>
            prevCandidates.map((candidate) =>
              candidate.candidate_id === candidate_id && candidate.job_id === job_id
                ? { ...candidate, interview_result: 'Rejected' }
                : candidate
            )
          );
        }
      })
      .catch((error) => {
        console.error('Error rejecting candidate:', error);
        toast.error('Failed to reject candidate');
      });
  };

  const handleInterviewUpdate = (candidate_id: number, job_id: number, email: string, title: string, interview_date: string) => {
    APIs.put
      .updateFinalResult({ candidate_id: candidate_id, job_id: job_id, interview_result: 'Selected', email: email, title: title, interview_date: interview_date })
      .then((res) => {
        if (res === "Unsuccessful. Due to the Interview Date is in past." || res === "Already Selected" || res === "Already candidate is rejected") {
          toast.warning(res);
        } else {
          toast.success("Candidate Selected for Interview successfully");
          setCandidates((prevCandidates) =>
            prevCandidates.map((candidate) =>
              candidate.candidate_id === candidate_id && candidate.job_id === job_id
                ? { ...candidate, interview_result: 'Selected' }
                : candidate
            )
          );
        }
      })
      .catch((error) => {
        console.error('Error updating candidate status:', error);
        toast.error('Failed to update candidate status');
      });
  };

  const isPastDate = (dateString: string) => new Date(dateString) < new Date();

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-xl text-blue-500 hover:text-blue-600 transition">
          ←
        </button>
      </div>
      <ToastContainer position="top-center" />
      <h1 className="text-3xl font-bold mb-8 text-center">Assign Final Result to the Candidates</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-bold">First Name</th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold">Last Name</th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold">Email</th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold">Job Title</th>
              <th className="py-3 px-6 text-center text-gray-600 font-bold">Interview Date</th>
              <th className="py-3 px-6 text-left text-gray-600 font-bold">Interview Result</th>
              <th className="py-3 px-6 text-center text-gray-600 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No candidates found.
                </td>
              </tr>
            ) : (
              candidates.map((candidate, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="py-4 px-6">{candidate.first_name}</td>
                  <td className="py-4 px-6">{candidate.last_name}</td>
                  <td className="py-4 px-6">{candidate.email}</td>
                  <td className="py-4 px-6">{candidate.title}</td>
                  <td className={`py-4 px-6 ${!isPastDate(candidate.interview_date) ? 'text-red-500' : ''}`}>
                    {candidate.interview_date}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`py-1 px-3 rounded-full text-sm ${getStatusStyles(candidate.status)}`}>
                      {candidate.interview_result}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {(candidate.interview_result === "Selected" || candidate.interview_result === "Rejected") ? (
                      <span className="text-gray-400">No actions available</span>
                    ) : (
                      (candidate.status === 'Interview' || candidate.interview_result == 'Pending') && (
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => handleInterviewUpdate(candidate.candidate_id, candidate.job_id, candidate.email, candidate.title, candidate.interview_date)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            disabled={!isPastDate(candidate.interview_date)}
                          >
                            Select
                          </button>
                          <button
                            onClick={() => handleReject(candidate.candidate_id, candidate.job_id, candidate.email, candidate.title)}
                            disabled={!isPastDate(candidate.interview_date)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                          >
                            Reject
                          </button>
                        </div>
                      )
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateFinalResult;
