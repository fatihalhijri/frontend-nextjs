'use client'
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Siswa() {
  const router = useRouter();
  const {data:session,status} = useSession()
  
  useEffect(() => {
    if (session) {
      if(session.user.role == 'admin') {
        router.push('/admin');
      } else {
        router.push('/siswa');
      }
    }
  }, [session, router]);

  console.log('session',session)
  return (
    <>
      <div>
      Hello....
      {JSON.stringify(session?.user)}
      {status}
      {JSON.stringify(session?.user?.role)}
      {status}
      <Button
        title="Logout"
        colorSchema="red"
        onClick={() => {
          signOut({redirect:false}).then(()=>
          router.push('/login')
          
          );
        }}
      />
      <Link href={"/lupapass"}>
              <Button title="Halaman Lupa Password" colorSchema="green" />
            </Link>
    </div>
    </>
  );
}
