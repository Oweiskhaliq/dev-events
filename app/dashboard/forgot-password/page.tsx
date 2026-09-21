


import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import Link from "next/link";
import ForgotPasswordCard from "@/components/ForgotPasswordCard";

const ForgotPasswordPage = async () => {
   const user = await getCurrentUser();
  
    if (!user) {
      redirect("/dashboard/login");
    }
  

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
       <ForgotPasswordCard />



        {/* Footer */}
        <p className="mt-6 text-center text-xs text-light-300">
          © 2026 DevEvent. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;

