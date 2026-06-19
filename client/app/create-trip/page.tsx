"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import AppNavbar from "@/components/AppNavbar/AppNavbar";

export default function CreateTrip() {
  const router = useRouter();

  useEffect(() => {
  const token =
    localStorage.getItem("token");

  if (!token) {
    router.push("/login");
  }
}, [router]);

  const [destination, setDestination] =
    useState("");

  const [days, setDays] =
    useState(5);

  const [budgetType, setBudgetType] =
    useState("Medium");

  const [interests, setInterests] =
    useState("");

  const handleSubmit = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await api.post(
          "/trips",
          {
            destination,
            days,
            budgetType,
            interests:
              interests.split(","),
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      router.push(
        `/trips/${response.data._id}`
      );
    } catch (error) {
      console.log(error);
      alert("Trip Creation Failed");
    }
  };

  return (
    <>
    <AppNavbar />
    <div className="min-h-screen p-8 bg-slate-100">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

        <h1 className="text-3xl font-bold">
          Create Trip
        </h1>

        <div className="space-y-4 mt-6">

          <input
            placeholder="Destination"
            className="w-full border p-3 rounded-xl"
            value={destination}
            onChange={(e) =>
              setDestination(
                e.target.value
              )
            }
          />

          <input
            type="number"
            className="w-full border p-3 rounded-xl"
            value={days}
            onChange={(e) =>
              setDays(
                Number(
                  e.target.value
                )
              )
            }
          />

          <select
            className="w-full border p-3 rounded-xl"
            value={budgetType}
            onChange={(e) =>
              setBudgetType(
                e.target.value
              )
            }
          >
            <option>
              Low
            </option>

            <option>
              Medium
            </option>

            <option>
              High
            </option>

          </select>

          <input
            placeholder="Food,Culture,Adventure"
            className="w-full border p-3 rounded-xl"
            value={interests}
            onChange={(e) =>
              setInterests(
                e.target.value
              )
            }
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl"
          >
            Generate Trip
          </button>

        </div>

      </div>

    </div>
    </>
  );
}