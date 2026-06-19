"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import AuthLayout from "@/components/AuthLayout/AuthLayout";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      router.push("/dashboard");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
          Login
        </button>
      </form>
    </AuthLayout>
  );
}