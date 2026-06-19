"use client";

import Link from "next/link";
import AppNavbar from "@/components/AppNavbar/AppNavbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [stats, setStats] = useState({
  totalTrips: 0,
  favoriteDestination: "N/A",
  });

  useEffect(() => {
  const token =
    localStorage.getItem("token");

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

  const fetchStats = async () => {
    try {
      const response =
        await api.get(
          "/trips/stats/summary",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setStats(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  fetchStats();

}, [router]);

  return (
    <>
      <AppNavbar />

      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-4xl font-bold">
          Welcome {user?.name || ""}
        </h1>

        <p className="text-gray-500 mt-2">
          Ready for your next adventure?
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="bg-white p-6 rounded-3xl shadow">

                <h3 className="text-gray-500">
                Total Trips
                </h3>

                <h2 className="text-4xl font-bold text-indigo-600">
                {stats.totalTrips}
                </h2>

            </div>

            <div className="bg-white p-6 rounded-3xl shadow">

                <h3 className="text-gray-500">
                Favorite Destination
                </h3>

                <h2 className="text-3xl font-bold text-indigo-600">
                {stats.favoriteDestination}
                </h2>

            </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <Link href="/create-trip">
            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer">
              <h2 className="text-2xl font-bold">
                Create New Trip
              </h2>

              <p className="text-gray-500 mt-2">
                Generate a new AI itinerary
              </p>
            </div>
          </Link>

          <Link href="/my-trips">
            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer">
              <h2 className="text-2xl font-bold">
                My Trips
              </h2>

              <p className="text-gray-500 mt-2">
                View your saved trips
              </p>
            </div>
          </Link>

          <Link href="/profile">
            <div className="bg-white p-8 rounded-3xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer">
                <h2 className="text-2xl font-bold">
                Profile
                </h2>

                <p className="text-gray-500 mt-2">
                View account details
                </p>
            </div>
          </Link>

        </div>
      </div>
    </>
  );
}