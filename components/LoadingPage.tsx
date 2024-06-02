"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
export default function LoadingPage({ children }: { children: ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
