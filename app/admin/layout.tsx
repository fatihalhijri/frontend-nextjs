import Link from "next/link";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    const router = router();
  const menus = [
    {
      label: "DashBoard",
      route: "/dashboard",
    },
    {
      label: "Profile",
      route: "/profile",
    },
    {
      label: "Kategory",
      route: "/kategori",
    },
    {
      label: "Produk",
      route: "/produk",
    },
    {
      label: "Konsumen",
      route: "/konsumen",
    },
  ];
  return (
    <div className="grid grid-cols-7 h-screen w-screen">
      <div className="bg-red-500 space-y-5 px-4">
        <h1 className="text-3xl text-blue-300 font-sans">AplikasiKu</h1>
        {menus.map((item, index) => (
          <button
            key={index} onClick={()=> }
            className="w-full bg-blue-200 hover:bg-blue-300 rounded-md text-base duration-100 hover:scale-110 hover:translate-y-1"
          >
            <Link href={item.route}>{item.label}</Link>
          </button>
        ))}
      </div>
      <div className="col-span-6">{children}</div>
    </div>
  );
}
