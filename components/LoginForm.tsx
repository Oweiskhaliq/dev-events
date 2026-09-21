"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
const router = useRouter();

const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
email: "",
password: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;


setFormData((prev) => ({
  ...prev,
  [name]: value,
}));


};

const handleSubmit = async (
e: React.FormEvent<HTMLFormElement>
) => {
e.preventDefault();


setError("");
setLoading(true);

try {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data: {
    message?: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  } = await response.json();

  if (!response.ok) {
    setError(data.message || "Login failed.");
    return;
  }

  // Login successful
  router.push("/dashboard");
} catch (error) {
  console.error("Login error:", error);
  setError("Something went wrong. Please try again.");
} finally {
  setLoading(false);
}


};

return ( <div className="rounded-2xl border border-border-dark bg-dark-100/60 p-6 shadow-xl sm:p-8"> <div className="mb-6"> <h2 className="text-2xl font-semibold text-light-100">
Sign in </h2>


    <p className="mt-1 text-sm text-light-200">
      Enter your account details below.
    </p>
  </div>

  <form onSubmit={handleSubmit} className="space-y-5">
    {/* Email */}
    <div>
      <label
        htmlFor="email"
        className="mb-2 block text-sm font-medium text-light-100"
      >
        Email address
      </label>

      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        required
        className="w-full rounded-lg border border-border-dark bg-background px-4 py-3 text-sm text-light-100 outline-none transition placeholder:text-light-300 focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>

    {/* Password */}
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="password"
          className="text-sm font-medium text-light-100"
        >
          Password
        </label>

        <Link
          href="/dashboard/forgot-password"
          className="text-xs text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <div className="relative">
        <input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          required
          className="w-full rounded-lg border border-border-dark bg-background px-4 py-3 pr-20 text-sm text-light-100 outline-none transition placeholder:text-light-300 focus:border-primary focus:ring-1 focus:ring-primary"
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-light-200 hover:text-primary"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>

    {/* Error */}
    {error && (
      <p className="text-sm text-red-500">
        {error}
      </p>
    )}

    {/* Remember me */}
    <div className="flex items-center gap-2">
      <input
        id="remember"
        name="remember"
        type="checkbox"
        className="h-4 w-4 rounded border-border-dark bg-background accent-primary"
      />

      <label
        htmlFor="remember"
        className="text-sm text-light-200"
      >
        Remember me
      </label>
    </div>

    {/* Submit */}
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Signing in..." : "Sign in"}
    </button>
  </form>

  {/* Register */}
  <div className="mt-6 border-t border-border-dark pt-6 text-center">
    <p className="text-sm text-light-200">
      Don&apos;t have an account?{" "}
      <Link
        href="/dashboard/signup"
        className="font-medium text-primary hover:underline"
      >
        Create account
      </Link>
    </p>
  </div>
</div>


);
};

export default LoginForm;
