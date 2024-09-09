 import { Link } from "react-router-dom";

function ManagerHeader() {
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
  
    function logout(): void {
        localStorage.clear();
        window.location.href = "/";
    }

  return (
    <div className="flex items-center justify-between bg-slate-900 mt-6 text-white py-4 px-10 w-full">
      <div className="flex items-center">
        {/* <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 mr-3">
          <FaUserCircle className="w-full h-full text-gray-400" />
        </div> */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 mr-3">
          <img src= { `https://avatar.iran.liara.run/public/boy?username=${storedFirstName}` }/>
          {/* <FaUserCircle className="w-full h-full text-gray-400" /> */}
        </div>
        <span className="text-xl font-bold">
          <i>Hello {`${storedFirstName} ${storedLastName}`}</i>
        </span>
      </div>
      
      <ul className="flex gap-8 items-center">
        <li>
          <Link to="/manager"></Link>
        </li>
        <li>
          <Link to="/postjob">Post Jobs</Link>
        </li>
        <li>
          <Link to="/fetch-candidates">Fetch Candidates</Link>
        </li>
        <li>
          <Link to="/update-interview-status">Update Application Status</Link>
        </li>
        <li>
          <Link to="/assign-date">Assign Interview Dates</Link>
        </li>
        <li>
          <Link to="/update-final-result">End Result</Link>
        </li>
        <li>
          {/* <Link to="/">Logout</Link> */}
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default ManagerHeader;
