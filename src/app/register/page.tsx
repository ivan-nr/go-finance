"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await register(fullName, email, password);
      toast.success("Your account has been created successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Please try again with different credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid md:grid-cols-2">
      {/* Left side with blue background */}
      <div className="bg-blue-600 text-white p-10 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-md mx-auto z-10">
          <h1 className="text-4xl font-bold mb-4">GoFinance</h1>
          <p className="text-lg mb-6">Lorem ipsum dolor sit amet</p>
          <Button
            asChild
            variant="default"
            className="text-white border-white hover:bg-blue-700 w-32"
          >
            <Link href="/">Read More</Link>
          </Button>
        </div>
        {/* Decorative curved lines */}
        <div className="absolute bottom-0 left-0 w-full h-48 opacity-20">
          <svg
            viewBox="0 0 400 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0,100 C150,200 250,0 400,100"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M0,150 C150,250 250,50 400,150"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Right side with registration form */}
      <div className="p-10 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-1">Hello!</h2>
          <p className="text-gray-500 mb-8">Sign Up to Get Started</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Register"
              )}
            </Button>
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
