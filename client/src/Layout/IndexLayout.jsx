import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function IndexLayout() {
  return (
    <div className="container mx-auto px-4 lg:px-8 ">
      {/* Header Section */}

      <Header />

      {/* Main Content Section */}
      <main className="flex-grow flex items-center justify-center py-6 sm:py-16">
        <Outlet />
      </main>

      {/* Footer (Optional, if needed in the future) */}
      {/* <footer className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © 2024 Your Company Name. All rights reserved.
      </footer> */}
    </div>
  );
}
