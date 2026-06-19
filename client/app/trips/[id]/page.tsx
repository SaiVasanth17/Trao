"use client";

import api from "@/services/api";
import AppNavbar from "@/components/AppNavbar/AppNavbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function TripDetails() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [trip, setTrip] = useState<any>(null);
  const [newActivity, setNewActivity] = useState("");

  const deleteActivity = async (
  dayIndex: number,
  activityIndex: number
) => {

  const updatedTrip =
    JSON.parse(
      JSON.stringify(trip)
    );

  updatedTrip.itinerary[
    dayIndex
  ].activities.splice(
    activityIndex,
    1
  );

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await api.put(
        `/trips/${id}`,
        updatedTrip,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setTrip(
      response.data
    );

  } catch (error) {

    console.log(error);

  }
};

    const addActivity = async () => {

  if (!newActivity.trim()) {
    return;
  }

  const updatedTrip =
    JSON.parse(
      JSON.stringify(trip)
    );

  updatedTrip.itinerary[0]
    .activities.push(
      newActivity
    );

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await api.put(
        `/trips/${id}`,
        updatedTrip,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setTrip(
      response.data
    );

    setNewActivity("");

  } catch (error) {

    console.log(error);

  }
};

    const regenerateDay = async (
  dayNumber: number
) => {
  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await api.put(
        `/trips/${id}/regenerate/${dayNumber}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setTrip(
      response.data
    );

  } catch (error) {

    console.log(error);

  }
};

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const token =
            localStorage.getItem("token");

            if (!token) {
            router.push("/login");
            return;
            }

        const response = await api.get(
          `/trips/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTrip(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchTrip();
    }
  }, [id, router]);

  if (!trip) {
    return (
      <>
        <AppNavbar />

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <h1 className="text-2xl font-semibold">
            Loading...
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <AppNavbar />

      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-6xl mx-auto">

          <Link
            href="/my-trips"
            className="inline-block mb-4 text-indigo-600 font-semibold hover:underline"
          >
            ← Back to My Trips
          </Link>

          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-3xl p-8 mb-8">

            <h1 className="text-5xl font-bold">
                📍 {trip.destination}
            </h1>

            <p className="mt-3 text-xl">
                {trip.days} Days Adventure
            </p>

            <p className="mt-2 opacity-90">
                Budget: {trip.budgetType}
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">

            {/* Itinerary */}
            <div className="bg-white p-6 rounded-3xl shadow">

              <h2 className="text-2xl font-bold mb-6">
                Itinerary
              </h2>

              {trip.itinerary?.map((day: any) => (
                <div
                  key={day.day}
                  className="mb-8"
                >
                  <div className="flex justify-between items-center mb-3">

                    <h3 className="font-bold text-lg">
                        Day {day.day}
                    </h3>

                    <button
                        onClick={() =>
                        regenerateDay(day.day)
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                    >
                        🔄 Regenerate
                    </button>

                  </div>

                  <div className="space-y-3">

                    {day.activities?.map(
                      (
                        activity: string,
                        index: number
                      ) => (
                        <div
                            key={index}
                            className="border-l-4 border-indigo-500 bg-slate-50 p-4 rounded-r-xl flex justify-between items-center"
                            >
                          <span>
                            {activity}
                          </span>

                          <button
                            onClick={() =>
                                deleteActivity(
                                day.day - 1,
                                index
                                )
                            }
                            className="text-red-500 hover:text-red-700"
                            >
                            Delete
                          </button>
                        </div>
                      )
                    )}

                  </div>
                </div>
              ))}

              {/* Add Activity */}

              <div className="border-t pt-6">

                <h3 className="font-bold mb-3">
                  Add Activity
                </h3>

                <input
                  type="text"
                  placeholder="Enter activity name"
                  value={newActivity}
                  onChange={(e) =>
                    setNewActivity(
                      e.target.value
                    )
                  }
                  className="w-full border p-3 rounded-xl"
                />

                <button
                    onClick={addActivity}
                    className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
                    >
                    Add Activity
                </button>

              </div>

            </div>

            {/* Right Side */}
            <div className="space-y-6">

              {/* Budget */}

              <div className="bg-white p-6 rounded-3xl shadow-lg">

                <div className="space-y-3">

                <div className="flex justify-between">
                    <span>✈ Flights</span>
                    <span>
                    ${trip.budgetEstimate?.flights}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>🏨 Hotel</span>
                    <span>
                    ${trip.budgetEstimate?.accommodation}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>🍽 Food</span>
                    <span>
                    ${trip.budgetEstimate?.food}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>🎯 Activities</span>
                    <span>
                    ${trip.budgetEstimate?.activities}
                    </span>
                </div>

                </div>

                <hr className="my-4" />

                <h3 className="text-xl font-bold">
                Total: $
                {trip.budgetEstimate?.total}
                </h3>

              </div>

              {/* Hotels */}

              <div className="bg-white p-6 rounded-3xl shadow">

                <h2 className="text-2xl font-bold mb-4">
                  Hotels
                </h2>

                {trip.hotels?.map(
                  (
                    hotel: any,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="mb-3 p-3 bg-slate-50 rounded-xl"
                    >
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-slate-50 border mb-3"
                        >
                        <h3 className="font-semibold">
                            🏨 {hotel.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                            Recommended stay
                        </p>

                        <p className="text-yellow-500">
                            ★★★★★
                        </p>
                        </div>
                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}