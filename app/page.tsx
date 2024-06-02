"use client";
import Loading from "@/components/components/loader";
import { useEffect, useState } from "react";

export default function App(){
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return(
    <>
    belajar-api
    </>
  )
}