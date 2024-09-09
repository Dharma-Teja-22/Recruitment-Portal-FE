// import { FaUserCircle } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

function Sidenav() {
  const storedFirstName = localStorage.getItem("firstName");
  const storedLastName = localStorage.getItem("lastName");
  function logout(): void {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <div className="flex items-center justify-between bg-slate-900 mt-6 text-white py-4 px-10 w-full">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 mr-3">
        <img src= { `https://avatar.iran.liara.run/public/boy?username=${storedFirstName}` }
        />
        </div>
        
        <span className="text-xl font-bold">
          <i>Hello {`${storedFirstName} ${storedLastName}`}</i>
        </span>
      </div>
      <ul className="flex gap-8 items-center">
        <li>
          <Link to="/candidate_dashboard"></Link>
        </li>
        <li>
          <Link to="/fetch_jobs">Fetch Jobs</Link>
        </li>
        <li>
          <Link to="/applyjobs">Application Status</Link>
        </li>
        <li>
          <Link to="/final-result">End Result</Link>
        </li>
        <li>
          {/* <Link to="/">Log out</Link> */}
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Sidenav;
