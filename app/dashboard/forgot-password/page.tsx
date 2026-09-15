
"use client";

import Link from "next/link";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // We will connect this to the API later.
    console.log("Reset password request:", email);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">
              DevEvent
            </h1>
          </Link>

          <p className="mt-2 text-light-200 text-sm">
            Reset your password and get back to your account.
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="rounded-2xl border border-border-dark bg-dark-100/60 p-6 sm:p-8 shadow-xl">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7a3 3 0 11-6 0v1m-2 0h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2z"
                />
              </svg>
            </div>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-light-100">
              Forgot password?
            </h2>

            <p className="mt-2 text-sm leading-6 text-light-200">
              No worries. Enter the email address associated with your
              account and we'll send you a link to reset your password.
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-border-dark bg-background px-4 py-3 text-sm text-light-100 outline-none transition placeholder:text-light-300 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90 active:scale-[0.99]"
            >
              Send reset link
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 border-t border-border-dark pt-6 text-center">
            <Link
              href="/dashboard/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-light-200 transition hover:text-primary"
            >
              <span>←</span>
              Back to login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-light-300">
          © 2026 DevEvent. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;

