import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { FaClipboardList, FaUsers, FaEdit, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  
  const [, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    const storedPic = localStorage.getItem('profilePic');
    setProfilePic(storedPic);
  }, []);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className='h-full border-4 border-black flex flex-col p-6'>
      {/* <div className='flex items-center mb-6'>
        <div
          onClick={handleProfileClick}
          className='flex items-center cursor-pointer'
        >
          <div className='w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 mr-3'>
            {profilePic ? (
              <img src={profilePic} alt='Profile' className='w-full h-full object-cover' />
            ) : (
              <FaUserCircle className='w-full h-full text-gray-400' />
            )}
          </div>
          <span className='text-xl font-bold'><i>Hello {userName}</i></span>
        </div>
      </div> */}

    
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 items-center'>
        <Card 
          onClick={() => handleCardClick('/postjob')} 
          className='p-6 flex flex-col items-center bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
        >
          <FaClipboardList className='text-3xl mb-4 text-orange-600' />
          <h1 className='text-lg font-medium text-center'>Post Jobs</h1>
        </Card>

        <Card 
          onClick={() => handleCardClick('/fetch-candidates')} 
          className='p-6 flex flex-col items-center bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
        >
          <FaUsers className='text-3xl mb-4 text-red-600' />
          <h1 className='text-lg font-medium text-center'>Fetch Candidates</h1>
        </Card>

        <Card 
          onClick={() => handleCardClick('/update-interview-status')} 
          className='p-6 flex flex-col items-center bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
        >
          <FaEdit className='text-3xl mb-4 text-indigo-600' />
          <h1 className='text-lg font-medium text-center'>Update Applicant Status</h1>
        </Card>

        <Card 
          onClick={() => handleCardClick('/assign-date')} 
          className='p-6 flex flex-col items-center bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
        >
          <FaCalendarCheck className='text-3xl mb-4 text-teal-600' />
          <h1 className='text-lg font-medium text-center'>Assign Interview Dates</h1>
        </Card>

        <Card 
          onClick={() => handleCardClick('/selected-candidates')} 
          className='p-6 flex flex-col items-center bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
        >
          <FaCheckCircle className='text-3xl mb-4 text-yellow-600' />
          <h1 className='text-lg font-medium text-center'>Selected Candidates</h1>
        </Card>

        <Card 
          onClick={() => handleCardClick('/update-final-result')} 
          className='p-6 flex flex-col items-center bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
        >
          <FaCheckCircle className='text-3xl mb-4 text-yellow-600' />
          <h1 className='text-lg font-medium text-center'>Update Final Result</h1>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
