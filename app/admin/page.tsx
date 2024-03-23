'use client'
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import useAuthModule from "../auth/lib";
import Link from "next/link";

export default function Admin() {
  const router = useRouter();
  const {useProfile} = useAuthModule()
  const {data:profile, isFetching} = useProfile()
  const { data: session, status } = useSession();
  console.log('profile',profile)

  console.log('session',session)
  return (
    <>
      <div>
      Admin
      {JSON.stringify(session)}
      {isFetching && <>Loading</>}

      {status}
      <Button
        title="Logout"
        colorSchema="red"
        onClick={() => {
          signOut({redirect:false}).then(()=>
          router.push('/login')
          
          );
        }}
        
        // onClick={() => {
        //   signOut({redirect:false});
        //   router.push('/login')
        // }}
      />
      <Link href={"/lupapass"}>
              <Button title="Halaman Lupa Password" colorSchema="green" />
            </Link>
    </div>
    </>
  );
}
