

 export const instant = false
import SignupForm from "@/components/SignupForm";
import Link from "next/link";


const Signup = () => {
  

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
            Create your account and start managing events.
          </p>
        </div>

        {/* Signup Card */}
        <div className="rounded-2xl border border-border-dark bg-dark-100/60 p-6 sm:p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-light-100">
              Create account
            </h2>

            <p className="mt-1 text-sm text-light-200">
              Fill in your details to get started.
            </p>
          </div>

         {/* form */}
         <SignupForm />

          {/* Login */}
          <div className="mt-6 border-t border-border-dark pt-6 text-center">
            <p className="text-sm text-light-200">
              Already have an account?{" "}
              <Link
                href="/dashboard/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
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

export default Signup;

