import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import APIs from "./APIs";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { Link } from "react-router-dom";

const signupSchema = z.object({
  first_name: z
    .string()
    .min(4, "First name must be at least 4 characters long"),
  last_name: z
    .string()
    .min(4, "Last name must be at least 4 characters long"),
  email: z
    .string()
    .email("Invalid email address")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ),
  password: z
    .string()
    .min(8, "Password must contain letters, numbers, and special characters of length 8")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
    ),
  role: z.string().nonempty("Role is required"),
});

export function Signup(): JSX.Element {
  const [data, setData] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const result = signupSchema.safeParse(data);
    if (!result.success) {
      const errorMessages = result.error.errors.map((error) => error.message);
      errorMessages.forEach((msg) => toast.error(msg));
      return;
    }

    console.log("Button clicked! Form data:", data);
    setData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
    });
    
    const res = await APIs.post.register(data);
    console.log(res)
    if(res) {
      toast.success("Successfully Registered");
    } else {
      toast.error("Check your credentials");
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center place-items-center bg-gray-900">
      <div>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto max-w-sm mt-10 mb-10">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">First name</Label>
                    <Input
                      id="first_name"
                      placeholder="Max"
                      value={data.first_name}
                      
                      onChange={(e) =>
                        setData({ ...data, first_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">Last name</Label>
                    <Input
                      id="last_name"
                      placeholder="Robinson"
                      value={data.last_name}
                      onChange={(e) =>
                        setData({ ...data, last_name: e.target.value })
                      }
                      
                    />
                  </div>
                </div>

                <div className="flex gap-5">
                  <Label>Role</Label>
                  <Label className="flex gap-3">
                    <input
                      type="radio"
                      value="Manager"
                      name="role"
                      checked={data.role === "Manager"}
                      onChange={(e) => setData({ ...data, role: e.target.value })}
                      
                    />
                    Manager
                  </Label>
                  <Label className="flex gap-3">
                    <input
                      type="radio"
                      value="Candidate"
                      name="role"
                      checked={data.role === "Candidate"}
                      onChange={(e) => setData({ ...data, role: e.target.value })}
                      
                    />
                    Candidate
                  </Label>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>

                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account ?{" "}
                {/* <a href="./Login" className="underline">
                  Sign in
                </a> */}
                <Link to='/login' className="underline">Login
                </Link>
              </div>
            </CardContent> 
          </Card>
        </form>

        <div id="displaySection"></div>
      </div>
    </div>
  );
}
