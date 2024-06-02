'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useBukuModule from "../../lib";
import Button from "@/components/Button";

const DetailBuku = ({ params }: { params: { id: string } }) => {
  const { useDetailBuku } = useBukuModule();
  const { data: data, isFetching, isLoading } = useDetailBuku(params.id);
  const [deletePayload, setDeletePayload] = useState<number[]>([]);
  const { data: session, status } = useSession();

  const router = useRouter();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
            <h1 className="text-lg font-bold ">Detail Buku</h1>
            <hr  className="border-1 border "/>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data && (
          <div className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{data.judul}</h2>
              <p className="text-gray-700 mb-1">Penerbit: {data.penerbit}</p>
              <p className="text-gray-700 mb-1">Penulis: {data.penulis}</p>
              <p className="text-green-600 font-bold mb-4">
                Tahun Terbit: {data.tahunTerbit}
              </p>
              <Button colorSchema="blue" title="Pinjam Buku Ini">
                {/* Button content */}
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="py-4">
            <h1 className="text-lg font-bold ">Ulasan Buku</h1>
            <hr  className="border-1 border "/>
            
        </div>
    </div>
  );
};
export default DetailBuku;
