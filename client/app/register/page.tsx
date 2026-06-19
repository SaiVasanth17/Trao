"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import AuthLayout from "@/components/AuthLayout/AuthLayout";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);

      alert("Registration Successful");

      router.push("/login");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start planning smarter"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
          Create Account
        </button>
      </form>
    </AuthLayout>
  );
}