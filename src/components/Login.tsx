import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import APIs from "./APIs";
import { Link, useNavigate } from "react-router-dom";


export function Login({
  setUseAuth,
}: {
  setUseAuth: (useAuth: { isAuth: boolean; role: string }) => void;
}): JSX.Element {
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
    role: string;
  }>({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Button clicked! Form data:", loginData);
    setLoginData({
      email: "",
      password: "",
      role: "",
    });

    const res = await APIs.post.login(loginData);
    console.log(res.managerId);
    localStorage.setItem("candidateId", res.candidateId);
    localStorage.setItem("email", res.email);
    localStorage.setItem("firstName", res.firstName);
    localStorage.setItem("lastName", res.lastName);
    localStorage.setItem("authToken", res.token);

    localStorage.setItem("managerId", res.managerId);
    localStorage.setItem("email", res.email);
    localStorage.setItem("firstName", res.firstName);
    localStorage.setItem("lastName", res.lastName);
    localStorage.setItem("authToken", res.token);

    if (loginData.role === "Manager" && res.managerId!=null) {
      setUseAuth({ isAuth: true, role: "Manager" });
      const toastId = toast.success('Manager sign in successfull', {
        autoClose: 1000, 
      });
      setTimeout(() => {
        if (toast.isActive(toastId)) {
          navigate("/manager");  
        }
      }, 1000);  
    } 
    else if (loginData.role === "Candidate" && res.candidateId!=null) {
      setUseAuth({ isAuth: true, role: "Candidate" });
      const toastId = toast.success('Candidate sign in successfull', {
        autoClose: 1000, 
      });
      setTimeout(() => {
        if (toast.isActive(toastId)) {
          navigate("/candidate");  
        }
      }, 1000);  
    } 
    else 
    {
      console.log("Invalid Details")
    }
  };

  return (
    <div className="flex h-screen w-screen place-items-center justify-center bg-gray-900">
        <ToastContainer />
        <div>
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-sm h-full mt-10 mb-10">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email and password below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-5">
                <Label>Role</Label>
                <Label className="flex gap-3">
                  <input
                    type="radio"
                    value="Manager"
                    name="role"
                    checked={loginData.role === "Manager"}
                    onChange={(e) =>
                      setLoginData({ ...loginData, role: e.target.value })
                    }
                    required
                  />
                  Manager
                </Label>
                <Label className="flex gap-3">
                  <input
                    type="radio"
                    value="Candidate"
                    name="role"
                    checked={loginData.role === "Candidate"}
                    onChange={(e) =>
                      setLoginData({ ...loginData, role: e.target.value })
                    }
                    required
                  />
                  Candidate
                </Label>
              </div>
              <Button className="w-full mt-2">Sign in</Button>
              <div className=" text-center text-sm">
                Don't have an account ?{" "}
                {/* <a href="./Signup" className="underline">
                  Sign Up
                </a> */}
                <Link to='/Signup' className="underline">Sign in</Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
