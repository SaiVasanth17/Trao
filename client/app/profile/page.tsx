"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppNavbar from "@/components/AppNavbar/AppNavbar";

interface User {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  if (!user) {
    return (
      <>
        <AppNavbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
          <h2 className="text-xl font-semibold">
            Loading...
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <AppNavbar />

      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-4xl font-bold">
              My Profile
            </h1>
          </div>

          <div className="space-y-6">

            <div className="border-b pb-4">
              <p className="text-gray-500 text-sm">
                Name
              </p>

              <h2 className="text-2xl font-semibold">
                {user.name}
              </h2>
            </div>

            <div className="border-b pb-4">
              <p className="text-gray-500 text-sm">
                Email
              </p>

              <h2 className="text-xl font-semibold">
                {user.email}
              </h2>
            </div>

            <div className="border-b pb-4">
              <p className="text-gray-500 text-sm">
                Account Type
              </p>

              <h2 className="text-xl font-semibold text-green-600">
                Traveler
              </h2>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Status
              </p>

              <h2 className="text-xl font-semibold text-blue-600">
                Active
              </h2>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Logout
          </button>

        </div>
      </div>
    </>
  );
}