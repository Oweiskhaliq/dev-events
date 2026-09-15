"use client";
import  Link from 'next/link';
import React, { useState } from 'react'

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
     <form className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-light-100"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
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
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-border-dark bg-background px-4 py-3 pr-20 text-sm text-light-100 outline-none transition placeholder:text-light-300 focus:border-primary focus:ring-1 focus:ring-primary"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-light-200 hover:text-primary"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

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
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90 active:scale-[0.99]"
            >
              Create account
            </button>
          </form>
  )
}

export default SignupForm