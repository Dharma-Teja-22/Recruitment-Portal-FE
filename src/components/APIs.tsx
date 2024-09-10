import axios from "axios";
import { toast } from "react-toastify";
const managerURL = import.meta.env.VITE_MANAGERURL;
const candidateURL = import.meta.env.VITE_CANDIDATEURL;
const url = import.meta.env.VITE_URL;
const dashboard = import.meta.env.VITE_DASHBOARD;
export default{
    
    get:{

        fetchCandidate: async ()=>{
            try{
                const res = await  axios.get(`${managerURL}/fetch-candidates`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                } 
            })
                return res.data
            }
            catch(err)
            {
                throw err;
            }
        },
        
        fetchJobData: async () =>{
            try{
                const res = await axios.get(`${candidateURL}/fetch-jobs`,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                console.log(res)
                return res.data
            }
            catch(err)
            {
                throw err;
            }
        },

        
    },
    
    post:{

        register: async (data: { first_name: string; last_name: string; email: string; password: string; role: string; })=>{
                const res = await axios.post(`${url}/registration`, data);
                if(res.status === 200)
                {
                    return res.data;                    
                }
                else if(res.status === 409)
                {
                    toast.error("Already email existed")
                    return res.data;
                }
                else
                {
                    return res.data;
                }
        },

        login: async (loginData: { email: string; password: string; role: string; }) =>{
            try{
                const res = await axios.post(`${url}/login`, loginData)
                console.log(res.data)
                return res.data;
            }
            catch(err)
            {
                toast.error("Invalid username and password")
                console.error(err)
                return err;
            }
        },

        fetchCandidateJobs: async (candidateId: number ) => {
            try {
              if (!candidateId) {
                throw new Error('Candidate ID is required');
              }
              const res = await axios.post(`${dashboard}/get-jobs`,{candidateId});
              return res.data;
            } catch (err) {
              console.error('Error fetching candidate jobs:', err);
              throw err;
            }
        },

        jobStatus: async (data: { candidate_id: number; job_id: number; }) =>{
            try{
                const res = await axios.post(`${candidateURL}/job-status-check`, data,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
             
                return res.data;
            }
            catch(err)
            {
                console.error(err)
                return err;
            }
        },
        
        postJob : async (combinedData: { manager_id: number | null; title: string; description: string; salary: number; location: string; job_type: string; experience_level: string; skills: string; application_deadline: Date; status: string; }) =>{
            try{
                const res = await axios.post(`${managerURL}/manager-post`, combinedData,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
             
                return res.data;
            }
            catch(err)
            {
                console.error(err)
                return err;
            }
        },

        assignInterviewDate: async (data: { job_id: number; candidate_id: number; interview_date: string; }) =>{
            try{
                const res = await axios.post(`${managerURL}/assign-interview`, data,{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                return res.data;
            }
            catch(err)
            {
                console.error(err)
                return err;
            }
        }
    },

    put:{

        applyForJob: async (data: { candidate_id: number;  job_id: number; resume_url: string; })=>{
            try{
                const res = await axios.put(`${candidateURL}/apply-job`, data, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`

                    }
                })
                console.log(res)
                return res.data;
            }
            catch(err)
            {
                console.error(err)
                return err;
            }
        },
  
        FindInterviewData: async(data: { candidate_id: number; job_id: number; }) => {
            try{
                const res = await axios.put(`${candidateURL}/interview-status-check`, data, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                console.log(res);
                return res.data;
            }
            catch(err)
            {
                console.log(err)
                throw err;
            }
        },

        FetchCandidates: async(manager_id: number) => {
            try{
                const res = await axios.put(`${managerURL}/fetch-candidates`, {manager_id}, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                console.log(res);
                return res.data;
            }
            catch(err)
            {
                console.error(err);
                throw err;
            }
        },


        FetchCandidatesInfo: async(manager_id: number) => {
            try{
                const res = await axios.put(`${managerURL}/fetch-candidates-info`, {manager_id}, {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                console.log(res);
                return res.data;
            }
            catch(err)
            {
                console.error(err);
                throw err;
            }
        },

        FetchCandidate: async (candidate_id: number, job_id: number) => {
            try 
            {
              const res = await axios.put(`${managerURL}/getCandidate`, { candidate_id, job_id }, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
              });
              console.log(res.data)
              console.log(res)
              return res.data;
            } 
            catch (err) {
              console.error(err);
              throw err;
            }
          },

        UpdateCandidateStatus: async (data: { candidate_id: number; job_id: number; status: string; manager_id: number }) => {
            try {
              const res = await axios.put(`${managerURL}/update-status`, data, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
              });
              return res.data;
            } catch (err) {
              throw err;
            }
        },

        updateFinalResult: async (data: { candidate_id: number; job_id: number; interview_result: string; }) =>{
            try {
                const res = await axios.put(`${managerURL}/update-interview-status`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
                });
                return res.data;
            } 
            catch (err) {
                throw err;
            }
        },

        FinalInterviewResult: async (data : {candidate_id: number, job_id: number}) =>{
            try {
                const res = await axios.put(`${candidateURL}/interview-status-check`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
                });
                return res.data;
            } 
            catch (err) {
                throw err;
            }
        }

    },
}   
