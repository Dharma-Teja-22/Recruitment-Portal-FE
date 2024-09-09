import { Card } from '../ui/card';
import { FaBriefcase, FaFileUpload, FaTrophy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className='h-full border-4 border-black flex flex-col p-6 '>
      

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6'>
        <Card 
          onClick={() => handleCardClick('/fetch_jobs')} 
          className='p-6 flex flex-col items-center bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
        >
          <FaBriefcase className='text-3xl mb-4 text-orange-600' />
          <h1 className='text-lg font-medium text-center'>Fetch All Jobs</h1>
        </Card>

        <Card 
          onClick={() => handleCardClick('/applyjobs')} 
          className='p-6 flex flex-col items-center bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
        >
          <FaFileUpload className='text-3xl mb-4 text-purple-600' />
          <h1 className='text-lg font-medium text-center'>Applied Jobs</h1>
        </Card>

        <Card 
          onClick={() => handleCardClick('/final-result')} 
          className='p-6 flex flex-col items-center bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
        >
          <FaTrophy className='text-3xl mb-4 text-yellow-600' />
          <h1 className='text-lg font-medium text-center'>Final Result / Selected Jobs</h1>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
