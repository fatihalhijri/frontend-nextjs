
'use client'
import React from "react";
import useProdukModule from "./lib";
import { useSession } from "next-auth/react";

const Produk = () => {
    const {useProdukList} = useProdukModule()
    const {data,isFetching} = useProdukList()
    const {data:session,status} = useSession();
  return (
    <div>
      <h1>Halaman Produk
        
        <br />
        {JSON.stringify(session)}
        <br />
        {data?.data.map((item, index) => (
            <section key={index}>
                <h1>{item.id}</h1>
                <h1>{item.nama_produk}</h1>
                <h1>{item.deskripsi}</h1>
                <h1>{item.harga}</h1>
            </section>
        ))}
        
      </h1>
      <br />
      {JSON.stringify(data)}
      
      
    </div>
  );
};

export default Produk;
