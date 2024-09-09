import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import APIs from '../APIs';

const InterviewDetails = () => {
  const [interviewDetails, setInterviewDetails] = useState({
    date: '',
    duration: '',
  });
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false); // State for dialog visibility
  const [interviewResult, setInterviewResult] = useState(''); // State for interview result

  const navigate = useNavigate(); // Initialize the navigate function
  
  const candidate_id = Number(localStorage.getItem("candidateId"));
  const job_id = Number(localStorage.getItem("jobId"));
  const data = { candidate_id, job_id };

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const res = await APIs.put.FindInterviewData(data); 
        if (res) {
          setInterviewDetails({
            date: res.interview_date,
            duration: res.Duration,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
        setLoading(false);
      }
    };

    fetchInterviewData();
  }, [candidate_id, job_id]);

  const handleOkClick = () => {
    navigate(-1); // Navigate back to the previous path
  };

  const handleStatus = async () => {
    try {
      const res = await APIs.put.FindInterviewData(data); // Fetch interview data again to get the result
      if (res) {
        setInterviewResult(res.interview_result);
        setShowDialog(true);
      }
    } catch (error) {
      console.error("Error fetching interview result:", error);
    }
  };

  const isDatePast = (dateString: string): boolean => {
    const interviewDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    interviewDate.setHours(0, 0, 0, 0);

    return interviewDate < today;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Interview Details</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="flex items-center justify-center mb-4">
              <FaCalendarAlt className="text-gray-700 mr-2" />
              <span
                className={`text-lg ${
                  isDatePast(interviewDetails.date) ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {interviewDetails.date.split('T')[0]}
              </span>
            </div>
            <div className="flex items-center justify-center mb-4">
              <FaClock className="text-gray-700 mr-2" />
              <span className="text-lg text-gray-700">
                {interviewDetails.duration}
              </span>
            </div>
            <div className="flex justify-center mt-6">
              {isDatePast(interviewDetails.date) ? (
                <button 
                  onClick={handleStatus}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Status
                </button>
              ) : (
                <button 
                  onClick={handleOkClick} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  OK
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Interview Status</h3>
            <div className="flex items-center mb-4">
              {interviewResult === 'Pending' && <FaExclamationTriangle className="text-yellow-500 text-2xl mr-2" />}
              {interviewResult === 'Selected' && <FaCheckCircle className="text-green-500 text-2xl mr-2" />}
              {interviewResult === 'Rejected' && <FaTimesCircle className="text-red-500 text-2xl mr-2" />}
              <span className={`text-lg ${interviewResult === 'Pending' ? 'text-yellow-500' : interviewResult === 'Selected' ? 'text-green-500' : 'text-red-500'}`}>
                {interviewResult || 'No result available'}
              </span>
            </div>
            <div className="flex justify-center mt-4">
              <button 
                onClick={() => setShowDialog(false)} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewDetails;
