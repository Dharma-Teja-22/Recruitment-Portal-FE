import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import APIs from "../APIs";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function ApplyJob() {
  const navigate = useNavigate();
  const [data, setData] = useState<{
    firstName: string | null;
    lastName: string | null;
    candidate_id: number;
    job_title: string | null;
    job_id:number;
    resume_url: string;
  }>({
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    candidate_id: Number(localStorage.getItem("candidateId")),
    job_title:  localStorage.getItem("selectedJobTitle"),
    job_id: Number(localStorage.getItem("selectedJobId")),
    resume_url: "",
  });

  
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log("Button clicked! Form data:", data);
    setData({ ...data,  resume_url: "" });
    const status =APIs.put.applyForJob({candidate_id:data.candidate_id, job_id:data.job_id, resume_url:data.resume_url});
    if(status!=null)
    {
      const toastId = toast.success('Application submitted successfully!', {
        autoClose: 1000, 
      });
      setTimeout(() => {
        if (toast.isActive(toastId)) {
          navigate(-1);  // Navigate back
        }
      }, 1000);  
    }
    else
    {
      const toastId = toast.error('Failed to submit application. Please try again.', {
        autoClose: 1000, 
      });
      setTimeout(() => {
        if (toast.isActive(toastId)) {
          navigate(-1);  
        }
      }, 1000);  

    }
    setData({ ...data, resume_url: "" });
  }

  return (
    <div className="bg-gray-900 h-screen">
      <ToastContainer />
      <div className="flex items-center ml-10">
        <button onClick={() => navigate(-1)} className="text-4xl text-blue-500 hover:text-blue-600 transition">
          ← 
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className=" flex  w-screen justify-center place-items-center mb-4"
      >
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-xl flex justify-center">
              Job Application
            </CardTitle>
            <CardDescription>
              Enter Information to apply for Job
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={data.firstName ?? ""}
                    required
                    readOnly
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={data.lastName ?? ""}
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="candidate_id">Candidate ID</Label>
                <Input
                  id="candidate_id"
                  type="number"
                  value={data.candidate_id}
                  required
                  readOnly
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  id="job_title"
                  type="text"
                  placeholder="1"
                  required
                  readOnly
                  value={data.job_title ?? "" }
                  onChange={(e) =>
                    setData({ ...data, job_title: (e.target.value) })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">skills</Label>
                <Input id="skills" type="text" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Resume URL</Label>
                <Input
                  id="resume_url"
                  type="text"
                  value={data.resume_url}
                  onChange={(e) =>
                    setData({ ...data, resume_url: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Apply for Job
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default ApplyJob;

