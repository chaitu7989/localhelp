import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import TrackingClient from "@/components/TrackingClient";

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Navbar />
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <div className="text-5xl animate-bounce">🗺️</div>
            <p className="text-gray-500">Loading live tracking...</p>
          </div>
        </div>
      }
    >
      <TrackingClient />
    </Suspense>
  );
}
