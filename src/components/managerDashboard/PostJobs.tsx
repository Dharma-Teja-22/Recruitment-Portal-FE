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
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PostJobs() {
  const navigate = useNavigate();
  const [data, setData] = useState<{
    title: string;
    description: string;
    salary: number;
    location: string;
    job_type: string;
    experience_level: string;
    skills: string;
    application_deadline: Date;
    status: string;
  }>({
    title: "",
    description: "",
    salary: 0,
    location: "",
    job_type: "",
    experience_level: "",
    skills: "",
    application_deadline: new Date(),
    status: "",
  });
  
  const manager_id = Number(localStorage.getItem("managerId"));
  async function postJob() {
    try {
      const combinedData = {
        ...data,
        manager_id, 
      };
      const res = await APIs.post.postJob(combinedData);
      console.log(res)
      console.log(res.data+ "jeahgiljfsd;")
      if(res == "Date is in the past!")
      {
        const toastId = toast.warning('Date is in the Past Can not post the JOB application!', {
          autoClose: 1000, 
        });
        setTimeout(() => {
          if (toast.isActive(toastId)) {
            navigate(-1);  
          }
        }, 1000); 
      }
      else if(res == "Duplicate entry found")
      {
        const toastId = toast.warning('Already the post is found in the DB', {
          autoClose: 1000, 
        });
        setTimeout(() => {
          if (toast.isActive(toastId)) {
            navigate(-1); 
          }
        }, 1000);  
      }
      else if(res == "Successfully Job Posted")
      {
        toast.success('Successfully posted the JOB application!', {
          onClose: () => {
            navigate(-1);
          }
        });                
      }
      return res.data;
    }
    catch (err) {
      console.error(err);
      return err;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    console.log("Button clicked! Form data:", data);

    const response = await postJob();
    console.log("API response:", response);

    // Reset form data
    setData({
      title: "",
      description: "",
      salary: 0,
      location: "",
      job_type: "",
      experience_level: "",
      skills: "",
      application_deadline: new Date(),
      status: "",
    });
  }

  return (
    <div className="bg-gray-900 ">
      <div className="flex items-center pt-4 ml-4">
        <button onClick={() => navigate(-1)} className="text-xl text-blue-500 hover:text-blue-600 transition">
          ← 
        </button>
      </div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="pt-10 pb-10">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-xl flex justify-center">
              Post A Job
            </CardTitle>
            <CardDescription>Enter Job Information to Post</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Job Title"
                    value={data.title}
                    required
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    placeholder="e.g., 50000"
                    required
                    value={data.salary}
                    onChange={(e) =>
                      setData({ ...data, salary: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={data.location}
                  onChange={(e) =>
                    setData({ ...data, location: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-5">
                <Label>Job Type</Label>
                <Label className="flex gap-3">
                  <input
                    type="radio"
                    value="Full-time"
                    name="job"
                    checked={data.job_type === "Full-time"}
                    onChange={(e) =>
                      setData({ ...data, job_type: e.target.value })
                    }
                    required
                  />
                  Full-time
                </Label>
                <Label className="flex gap-3">
                  <input
                    type="radio"
                    value="Part-time"
                    name="job"
                    checked={data.job_type === "Part-time"}
                    onChange={(e) =>
                      setData({ ...data, job_type: e.target.value })
                    }
                    required
                  />
                  Part-time
                </Label>
                <Label className="flex gap-3">
                  <input
                    type="radio"
                    value="Contract"
                    name="job"
                    checked={data.job_type === "Contract"}
                    onChange={(e) =>
                      setData({ ...data, job_type: e.target.value })
                    }
                    required
                  />
                  Contract
                </Label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  type="text"
                  value={data.skills}
                  onChange={(e) =>
                    setData({ ...data, skills: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-5">
                <Label>Experience Level</Label>
                <Label className="flex gap-3">
                  <input
                    type="radio"
                    value="Freshers"
                    name="experienceLevel"
                    checked={data.experience_level === "Freshers"}
                    onChange={(e) =>
                      setData({ ...data, experience_level: e.target.value })
                    }
                    required
                  />
                  Freshers
                </Label>
                <Label className="flex gap-3">
                  <input
                    type="radio"
                    value="Experienced"
                    name="experienceLevel"
                    checked={data.experience_level === "Experienced"}
                    onChange={(e) =>
                      setData({ ...data, experience_level: e.target.value })
                    }
                    required
                  />
                  Experienced
                </Label>
                <Label className="flex gap-3">
                  <input
                    type="radio"
                    value="Freshers/Experienced"
                    name="experienceLevel"
                    checked={
                      data.experience_level === "Freshers/Experienced"
                    }
                    onChange={(e) =>
                      setData({ ...data, experience_level: e.target.value })
                    }
                    required
                  />
                  Freshers/Experienced
                </Label>
              </div>

              <div className="grid gap-2">
              <Label htmlFor="datee">Application Deadline</Label>
              <input
                type="date"
                name="DOB"
                value={data.application_deadline.toISOString().split('T')[0]} 
                onChange={(e) => {
                  setData({
                    ...data,
                    application_deadline: new Date(e.target.value),
                  });
                }}
              />
            </div>


              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  type="text"
                  value={data.status}
                  onChange={(e) =>
                    setData({ ...data, status: e.target.value })
                  }
                />
              </div>

              <Button type="submit" className="w-full">
                Create a Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default PostJobs;
