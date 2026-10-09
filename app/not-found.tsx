
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-xl text-center">
        {/* 404 */}
        <div className="relative">
          <h1 className="text-[120px] font-black leading-none tracking-tight text-primary/10 sm:text-[180px]">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-primary sm:text-8xl">
              404
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-light-100 sm:text-3xl">
            Page not found
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-light-200 sm:text-base">
            Looks like this page took a wrong turn. The page you're
            looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90 sm:w-auto"
          >
            Back to home
          </Link>

          <Link
            href="/events"
            className="w-full rounded-lg border border-border-dark bg-dark-100 px-6 py-3 text-sm font-medium text-light-100 transition hover:border-primary hover:text-primary sm:w-auto"
          >
            Explore events
          </Link>
        </div>

        {/* Decorative element */}
        <div className="mx-auto mt-12 flex max-w-xs items-center justify-center gap-2">
          <span className="h-px flex-1 bg-border-dark" />
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="h-px flex-1 bg-border-dark" />
        </div>

        <p className="mt-6 text-xs text-light-300">
          © 2026 DevEvent. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default NotFound;

