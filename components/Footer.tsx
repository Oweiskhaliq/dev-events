
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border-dark bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-primary">
                DevEvent
              </h2>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-light-200">
              Discover developer events, connect with the community,
              and stay up to date with the latest technology conferences,
              workshops, and meetups.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-dark bg-dark-100 text-light-200 transition hover:border-primary hover:text-primary"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-dark bg-dark-100 text-light-200 transition hover:border-primary hover:text-primary"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.99H3.54v11.46ZM22.23 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.74V1.74C24 .78 23.21 0 22.23 0Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-dark bg-dark-100 text-light-200 transition hover:border-primary hover:text-primary"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.9h1.73L8.29 3.99H6.43L17.8 19.9Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-light-100">
              Platform
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/events"
                  className="text-sm text-light-200 transition hover:text-primary"
                >
                  Browse Events
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/create-event"
                  className="text-sm text-light-200 transition hover:text-primary"
                >
                  Create Event
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-light-200 transition hover:text-primary"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/signup"
                  className="text-sm text-light-200 transition hover:text-primary"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-light-100">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-light-200 transition hover:text-primary"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-light-200 transition hover:text-primary"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-light-200 transition hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-light-200 transition hover:text-primary"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border-dark pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-light-300">
            © 2026 DevEvent. All rights reserved.
          </p>

          <p className="text-sm text-light-300">
            Built for{" "}
            <span className="font-medium text-primary">
              developers
            </span>
            , by developers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

