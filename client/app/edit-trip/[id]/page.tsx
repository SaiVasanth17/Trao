"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useParams,
} from "next/navigation";

import api from "@/services/api";
import AppNavbar from "@/components/AppNavbar/AppNavbar";

export default function EditTrip() {

  const router = useRouter();

  const params =
    useParams();

  const [destination,
    setDestination] =
    useState("");

  const [days,
    setDays] =
    useState(5);

  const [budgetType,
    setBudgetType] =
    useState("Medium");

  const [interests,
    setInterests] =
    useState("");

  useEffect(() => {

    const fetchTrip =
      async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await api.get(
          `/trips/${params.id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const trip =
        response.data;

      setDestination(
        trip.destination
      );

      setDays(
        trip.days
      );

      setBudgetType(
        trip.budgetType
      );

      setInterests(
        trip.interests.join(
          ", "
        )
      );
    };

    fetchTrip();

  }, [params.id]);

  const handleUpdate =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await api.put(
        `/trips/${params.id}`,
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

      alert(
        "Trip Updated"
      );

      router.push(
        `/trips/${params.id}`
      );

    } catch (error) {

      console.log(error);

      alert(
        "Update Failed"
      );

    }
  };

  return (
    <>
      <AppNavbar />

      <div className="min-h-screen p-8 bg-slate-100">

        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow">

          <h1 className="text-3xl font-bold mb-6">
            Edit Trip
          </h1>

          <div className="space-y-4">

            <input
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
              className="w-full border p-3 rounded-xl"
              value={interests}
              onChange={(e) =>
                setInterests(
                  e.target.value
                )
              }
            />

            <button
              onClick={
                handleUpdate
              }
              className="
                w-full
                bg-indigo-600
                text-white
                py-3
                rounded-xl
              "
            >
              Update Trip
            </button>

          </div>

        </div>

      </div>
    </>
  );
}