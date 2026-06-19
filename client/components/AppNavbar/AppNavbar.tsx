"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AppNavbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-indigo-600">
          TraoTrip
        </h1>

        <div className="flex gap-6 items-center">

          <Link href="/dashboard">
            Dashboard
          </Link>

          <Link href="/create-trip">
            Create Trip
          </Link>

          <Link href="/my-trips">
            My Trips
          </Link>

          <Link href="/profile">
            Profile
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}