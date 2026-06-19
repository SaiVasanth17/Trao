"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppNavbar from "@/components/AppNavbar/AppNavbar";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }
  }, [router]);

  if (!user) {
    return (
      <>
        <AppNavbar />
        <div className="p-8">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <AppNavbar />

      <div className="min-h-screen bg-slate-100 p-8">

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow">

          <h1 className="text-4xl font-bold mb-8">
            Profile
          </h1>

          <div className="space-y-4">

            <div>
              <p className="text-gray-500">
                Name
              </p>

              <h2 className="text-xl font-semibold">
                {user.name}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">
                Email
              </p>

              <h2 className="text-xl font-semibold">
                {user.email}
              </h2>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}