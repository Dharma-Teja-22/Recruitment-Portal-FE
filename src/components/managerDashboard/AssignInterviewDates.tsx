import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIs from '../APIs';
import { useNavigate } from 'react-router-dom';

interface Candidate {
  job_id: number;
  candidate_id: number;
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  status: string;
}

const AssignInterviewDates: React.FC = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const managerId = Number(localStorage.getItem('managerId'));

  useEffect(() => {
    APIs.put.FetchCandidates(managerId)
      .then((data) => {
        setCandidates(data);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
        toast.error('Failed to fetch candidates');
      });
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedCandidate && selectedDate) {
      const data = {
        job_id: selectedCandidate.job_id,
        candidate_id: selectedCandidate.candidate_id,
        interview_date: selectedDate,
      };

      APIs.post
        .assignInterviewDate(data)
        .then(() => {
          toast.success('Interview date assigned successfully');
          setShowModal(false);
          setSelectedCandidate(null);
          setSelectedDate(null);
        })
        .catch((error) => {
          console.error('Error assigning interview date:', error);
          toast.error('Failed to assign interview date');
        });
    } else {
      toast.error('Please select a date');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-xl text-blue-500 hover:text-blue-600 transition">
          ← 
        </button>
       
      </div>
      
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Assign Interview Dates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => ( 
          candidate.status == "Interview" &&
          <div key={candidate.candidate_id} className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{candidate.title}</h2>
            <p className="mb-2 text-gray-600">
              <strong>Name:</strong> {candidate.first_name} {candidate.last_name}
            </p>
            <p className="mb-4 text-gray-600">
              <strong>Email:</strong> {candidate.email}
            </p>
            <button
              onClick={() => {
                setSelectedCandidate(candidate);
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
            >
              Assign Interview Date
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Assign Interview Date for {selectedCandidate?.first_name} {selectedCandidate?.last_name}
            </h2>
            <label className="block text-gray-700 mb-2 font-medium">Select Date:</label>
            <input
              type="date"
              value={selectedDate || ''}
              onChange={handleDateChange}
              required
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignInterviewDates;
