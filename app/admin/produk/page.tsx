"use client";
import React from "react";
import useProdukModule from "./lib";
import { useSession } from "next-auth/react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
// import router, { useRouter } from "next/router";

const Produk = () => {
  const { useProdukList } = useProdukModule();
  const { data, isFetching } = useProdukList();
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div>
      <h1>
        Halaman Produk
        <br />
        {JSON.stringify(session)}
        <br />
        <Button
          colorSchema="blue"
          title="Tambah"
          onClick={() => {
            router.push("/admin/produk/tambah");
          }}
        ></Button>
        {/* {data?.data.map((item, index) => (
          <section key={index}>
            <h1>{item.id}</h1>
            <h1>{item.nama_produk}</h1>
            <h1>{item.deskripsi_produk}</h1>
            <h1>{item.harga}</h1>
          </section>
        ))} */}
        <div className="px-20 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.data.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* <img src={item.imageUrl} alt={item.nama_produk} className="w-full h-48 object-cover"/> */}
              <div className="w-full h-48 object-cover flex justify-center items-center">
                {item.nama_produk}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{item.nama_produk}</h2>
                <p className="text-gray-700 mb-4">{item.deskripsi_produk}</p>
                <p className="text-green-600 font-bold mb-2">
                  Rp. {item.harga}
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </h1>
      <br />
      {/* {JSON.stringify(data)} */}
    </div>
  );
};

export default Produk;
