'use client'
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
export default function LoadingPage({ children }: { children: ReactNode }) {
  const {status} = useSession();

  if(status === 'loading'){
    
      return <div>Loading....</div>;
  }
  return <>{children}</>
  
}
