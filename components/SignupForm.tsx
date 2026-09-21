"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignupForm = () => {
const router = useRouter();

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
confirmPassword: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;


setFormData((prev) => ({
  ...prev,
  [name]: value,
}));


};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();


setError("");

// Check passwords
if (formData.password !== formData.confirmPassword) {
  setError("Passwords do not match.");
  return;
}

setLoading(true);

try {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }),
  });

  const data: { message?: string } = await response.json();

  if (!response.ok) {
    setError(data.message || "Registration failed.");
    return;
  }

  // Registration successful
  router.push("/dashboard/login");
} catch (error) {
  console.error("Signup error:", error);
  setError("Something went wrong. Please try again.");
} finally {
  setLoading(false);
}


};

return ( <form onSubmit={handleSubmit} className="space-y-5">
{/* Name */} <div> <label
       htmlFor="name"
       className="mb-2 block text-sm font-medium text-light-100"
     >
Full name </label>


    <input
      id="name"
      name="name"
      type="text"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your full name"
      required
      className="w-full rounded-lg border border-border-dark bg-background px-4 py-3 text-sm text-light-100 outline-none transition placeholder:text-light-300 focus:border-primary focus:ring-1 focus:ring-primary"
    />
  </div>

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
    <label
      htmlFor="password"
      className="mb-2 block text-sm font-medium text-light-100"
    >
      Password
    </label>

    <div className="relative">
      <input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        required
        minLength={6}
        className="w-full rounded-lg border border-border-dark bg-background px-4 py-3 pr-20 text-sm text-light-100 outline-none transition placeholder:text-light-300 focus:border-primary focus:ring-1 focus:ring-primary"
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-light-200 hover:text-primary"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  </div>

  {/* Confirm Password */}
  <div>
    <label
      htmlFor="confirmPassword"
      className="mb-2 block text-sm font-medium text-light-100"
    >
      Confirm password
    </label>

    <div className="relative">
      <input
        id="confirmPassword"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        required
        minLength={6}
        className="w-full rounded-lg border border-border-dark bg-background px-4 py-3 pr-20 text-sm text-light-100 outline-none transition placeholder:text-light-300 focus:border-primary focus:ring-1 focus:ring-primary"
      />

      <button
        type="button"
        onClick={() => setShowConfirmPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-light-200 hover:text-primary"
      >
        {showConfirmPassword ? "Hide" : "Show"}
      </button>
    </div>
  </div>

  {/* Error */}
  {error && (
    <p className="text-sm text-red-500">
      {error}
    </p>
  )}

  {/* Terms */}
  <div className="flex items-start gap-2">
    <input
      id="terms"
      name="terms"
      type="checkbox"
      required
      className="mt-1 h-4 w-4 rounded border-border-dark bg-background accent-primary"
    />

    <label
      htmlFor="terms"
      className="text-sm leading-5 text-light-200"
    >
      I agree to the{" "}
      <Link
        href="/terms"
        className="text-primary hover:underline"
      >
        Terms & Conditions
      </Link>
    </label>
  </div>

  {/* Submit */}
  <button
    type="submit"
    disabled={loading}
    className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
  >
    {loading ? "Creating account..." : "Create account"}
  </button>
</form>


);
};

export default SignupForm;
