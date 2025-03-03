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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("You have been logged in successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Please check your credentials and try again");
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

      {/* Right side with login form */}
      <div className="p-10 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-1">Hello Again!</h2>
          <p className="text-gray-500 mb-8">Welcome Back</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                "Login"
              )}
            </Button>
            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password
              </Link>
            </div>
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
