import "./App.css";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";

import Candididate from "./components/candidateDashboard/Candididate";
import Manager from "./components/managerDashboard/Manager";
import PostJobs from "./components/managerDashboard/PostJobs";
import ApplyJob from "./components/candidateDashboard/ApplyJob";
import { useState } from "react";
import ErrorPage from "./components/ErrorPage";
import FetchJobs from "./components/candidateDashboard/FetchJobs";
import AppliedJobs from "./components/candidateDashboard/AppliedJobs";
import FinalResult from "./components/candidateDashboard/FinalResult";
import InterviewDetails from "./components/candidateDashboard/InterviewDetails";
import FetchCandidates from "./components/managerDashboard/FetchCandidates";
import CandidateProfile from "./components/managerDashboard/CandidateProfile";
import CandidateTable from "./components/managerDashboard/CandidateTable";
import AssignInterviewDates from "./components/managerDashboard/AssignInterviewDates";
import UpdateFinalResult from "./components/managerDashboard/UpdateFinalResult";
import SelectedCandidates from "./components/managerDashboard/SelectedCandidates";
function App() {
  const [useAuth, setUseAuth] = useState<{ isAuth: boolean; role: string }>({
    isAuth: false,
    role: "",
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setUseAuth={setUseAuth} />}
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>

          {useAuth.isAuth && useAuth.role == "Manager" ? (
            <>
              <Route path="/manager" element={<Manager />} />
              <Route path="/postjob" element={<PostJobs />} />
              <Route path = "/fetch-candidates" element = {<FetchCandidates/>}/>
              <Route path="/candidates/:candidateId/:jobId" element={<CandidateProfile />} />
              <Route path="update-interview-status" element={<CandidateTable/>}/>
              <Route path="/assign-date" element={<AssignInterviewDates/>}/>
              <Route path="/update-final-result" element = {<UpdateFinalResult/>}/>
              <Route path="/selected-candidates" element ={<SelectedCandidates/>}/>
            </>
          ) : null}

          {useAuth.isAuth && useAuth.role == "Candidate" ? (
            <>
              <Route path="/candidate" element={<Candididate />} />
              <Route path='/candidate_dashboard' element={<Candididate/>}/>
              <Route path="/applyjob/:jobId" element={<ApplyJob />}></Route>
              <Route path="/fetch_jobs" element={<FetchJobs/>}/>
              <Route path="/applyjobs" element={<AppliedJobs/>}/>
              <Route path="/final-result" element= {<FinalResult/>}/>
              <Route path="/interview-details" element = {<InterviewDetails/>}/>
            </>
          ) : null}

          <Route path="/*" element={<ErrorPage/>} ></Route>          
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
