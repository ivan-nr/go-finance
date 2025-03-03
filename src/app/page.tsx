import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen w-full grid md:grid-cols-2">
      {/* Left side with blue background */}
      <div className="bg-blue-600 text-white p-10 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-md mx-auto z-10">
          <h1 className="text-4xl font-bold mb-4">GoFinance</h1>
          <p className="text-lg mb-6">Lorem ipsum dolor sit amet</p>
          <Button
            // asChild
            variant="default"
            className="text-white border-white hover:bg-blue-700 w-32"
          >
            Learn more
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

      {/* Right side with auth options */}
      <div className="p-10 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold mb-1">Welcome to GoFinance</h2>
          <p className="text-gray-500 mb-8">
            Please sign in or create an account to continue
          </p>

          <div className="space-y-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/login">Login to your account</Link>
            </Button>
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/register">Create a new account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
