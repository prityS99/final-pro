"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { account, tableDb } from "@/lib/appwrite.config";
import { Query } from "appwrite";
import Cookies from "js-cookie";
import { Mail, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const { email, password } = data;


      try {
        await account.deleteSessions();
      } catch {
        console.log("No previous session.");
      }


      await account.createEmailPasswordSession(email, password);


      const res = await tableDb.listRows(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
        "profiles",
        [Query.equal("email", email)]
      );

      if (res.rows.length === 0) {
        throw new Error("User profile not found.");
      }

      const user = res.rows[0];

      // Save cookies
      Cookies.set("session", "active", { expires: 1 });
      Cookies.set("role", user.role, { expires: 1 });

      return user;
    },

    onSuccess: (user) => {
      toast.success(`Welcome back, ${user.name || user.email}!`);
      if (!localStorage.getItem("trial_start")) {
        localStorage.setItem("trial_start", Date.now().toString());
      }
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/project");
      }
    },

    onError: (err: any) => {
      const msg = err?.message?.includes("Invalid credentials")
        ? "Incorrect email or password."
        : err?.message || "Login failed. Please try again.";

      toast.error(msg);
    },

    onSettled: () => setLoading(false),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!email || !password) {
      toast.error("Please enter all fields");
      return;
    }

    setLoading(true);

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700">
          Login to Your Account
        </h2>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Mail size={18} />
            <input
              type="email"
              name="email"
              className="w-full outline-none bg-transparent"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Lock size={18} />
            <input
              type="password"
              name="password"
              className="w-full outline-none bg-transparent"
              placeholder="Enter password"
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg shadow-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Signing in...
            </>
          ) : (
            "Log In"
          )}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-indigo-600 font-semibold"
          >
            Sign up here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
