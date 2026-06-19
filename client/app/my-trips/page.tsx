"use client";

import api from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppNavbar from "@/components/AppNavbar/AppNavbar";

export default function MyTrips() {
  const router = useRouter();

  const [trips, setTrips] =
    useState<any[]>([]);

  const fetchTrips = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/trips",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setTrips(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTrip = async (
    tripId: string
    ) => {
    try {

        const token =
        localStorage.getItem(
            "token"
        );

        await api.delete(
        `/trips/${tripId}`,
        {
            headers: {
            Authorization:
                `Bearer ${token}`,
            },
        }
        );

        setTrips(
        trips.filter(
            (trip) =>
            trip._id !== tripId
        )
        );

    } catch (error) {

        console.log(error);

    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchTrips();
  }, [router]);

  return (
    <>
      <AppNavbar />

      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-4xl font-bold">
          My Trips
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          {trips.map((trip) => (
            <Link
              key={trip._id}
              href={`/trips/${trip._id}`}
            >
              <div className="bg-white p-6 rounded-3xl shadow hover:shadow-lg">
                <h2 className="text-2xl font-bold">
                  {trip.destination}
                </h2>

                <p className="text-gray-500">
                  {trip.days} Days
                </p>

                <p className="mt-3">
                  Budget: {trip.budgetType}
                </p>
                <button
                    onClick={(e) => {
                        e.preventDefault();

                        if (
                        confirm(
                            "Delete this trip?"
                        )
                        ) {
                        deleteTrip(
                            trip._id
                        );
                        }
                    }}
                    className="
                    mt-4
                    bg-red-500
                    text-white
                    px-3
                    py-2
                    rounded-lg
                    "
                    >
                    Delete
                    </button>
              </div>
              
            </Link>
            
          ))}

        </div>
      </div>
    </>
  );
}