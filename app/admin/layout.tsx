"use client";
import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const menus = [
    {
      label: "DashBoard",
      route: "",
    },
    {
      label: "Profile",
      route: "profile",
    },
    {
      label: "Kategory",
      route: "kategori",
    },
    {
      label: "Produk",
      route: "produk",
    },
    {
      label: "Konsumen",
      route: "konsumen",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-7 h-screen w-screen">
        <div className="bg-red-500 space-y-5 px-4">
          {pathname}
          <h1 className="text-3xl text-blue-300 font-sans">AplikasiKu</h1>
          {menus.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(`/admin/${item.route}`)}
              // className={clsx(
              //   "w-full  rounded-md text-base duration-100 hover:scale-110 ",
              //   {
              //     "bg-blue-200 hover:bg-blue-300":
              //       pathname?.includes(item.route) === false,
              //     "bg-blue-500 hover:bg-blue-500 text-white":
              //       pathname?.includes(item.route) === true ,
              //   }
              // )}
              className={clsx(
                "w-full rounded-md text-base duration-100 hover:scale-110",
                {
                  "bg-blue-200 hover:bg-blue-300": pathname?.includes(item.route) === false,
                  "bg-blue-200 hover:bg-blue-500 text-white": pathname?.includes(item.route) === true,
                  "bg-blue-500 text-white": pathname?.includes(item.route), // tambahkan kelas ini untuk tombol yang di-klik
                }
              )}  
            >
              {/* <Link href={`admin/${item.route}`}>{item.label}</Link> */}
              {item.label}
            </button>
          ))}
        </div>
        <div className="col-span-6">{children}</div>
      </div>
    </>
  );
}
