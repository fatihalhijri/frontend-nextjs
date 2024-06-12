// "use client";
// import Button from "@/components/Button";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import useBukuModule from "../lib";

// const KategoriListComponent = () => {
//   const [selectedKategori, setSelectedKategori] = useState<number | null>(null);
//   const { useKategoriAll2 } = useBukuModule();
//   const { data: kategoriData, isFetching: isFetchingKategori, isLoading: isLoadingKategori } = useKategoriAll2();

//   const { useBukuByKategori } = useBukuModule();
//   const { data: bukuData, isFetching: isFetchingBuku, isLoading: isLoadingBuku } = useBukuByKategori(selectedKategori);

//   const router = useRouter();

//   const handleKategoriClick = (kategoriId: number) => {
//     setSelectedKategori(kategoriId);
//   };

//   return (
//     <div>
//       <div className="mb-4">
//         <h2 className="text-xl font-bold">Pilih Kategori:</h2>
//         {isLoadingKategori ? (
//           <div>Loading...</div>
//         ) : (
//           <div className="flex space-x-2">
//             {kategoriData?.data.map((kategori) => (
//               <Button key={kategori.id} onClick={() => handleKategoriClick(kategori.id)} colorSchema="blue" title={`${kategori.kategori.nama_kategori}`}>
//                 {kategori.kategori.nama_kategori}
//               </Button>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {isLoadingBuku ? (
//           <div>Loading...</div>
//         ) : (
//           bukuData?.data.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="p-4">
//                 <h2 className="text-xl font-bold mb-2">{item.judul}</h2>
//                 <p className="text-gray-700 mb-1">Penerbit: {item.penerbit}</p>
//                 <p className="text-gray-700 mb-1">Penulis: {item.penulis}</p>
//                 <p className="text-green-600 font-bold mb-4">Tahun Terbit: {item.tahunTerbit}</p>
//                 <Button colorSchema="blue" title="Pinjam Buku Ini" />
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default KategoriListComponent;

// "use client";
// import Button from "@/components/Button";
// import { useMemo, useState } from "react";
// import useBukuModule from "../lib";

// const KategoriListComponent = () => {
//   const [selectedKategori, setSelectedKategori] = useState<number | null>(null);
//   const { useKategoriRelasiList1 } = useBukuModule();
//   const { data: kategoriData, isLoading: isKategoriLoading } =
//     useKategoriRelasiList1();

//   const handleKategoriClick = (kategoriId: number) => {
//     setSelectedKategori(kategoriId);
//   };

//   const uniqueCategories = useMemo(() => {
//     const categorySet = new Set();
//     kategoriData?.data.forEach((item: any) => {
//       categorySet.add(JSON.stringify(item.kategori));
//     });
//     return Array.from(categorySet).map((item: any) => JSON.parse(item));
//   }, [kategoriData]);
//   const filteredBooks = selectedKategori
//     ? kategoriData?.data.filter(
//         (item: any) => item.kategori.id === selectedKategori
//       )
//     : kategoriData?.data;

//   return (
//     <div className="flex flex-col space-y-4">
//       {/* <div className="flex flex-wrap space-x-2">
//         {kategoriData?.data.map((kategoriItem: any) => (
//           <Button
//             key={kategoriItem.kategori.id}
//             onClick={() => handleKategoriClick(kategoriItem.kategori.id)}
//             title={kategoriItem.kategori.nama_kategori}
//             colorSchema="blue"
//           />
//         ))}
//       </div> */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
//           {kategoriData?.data.map((kategoriItem: any) => (
//             <div
//               className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
//               style={{ backgroundImage: "url('/buku2.jpg')" }}
//               key={kategoriItem.kategori.id}
//               onClick={() => {
//                 // useKategoriAll();
//                 // router.push("/peminjam/kategoriall");
//               }}
//             >
//               <div className="absolute inset-0 bg-black opacity-60"></div>
//               <div className="relative z-10 text-white">Semua Buku</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {isKategoriLoading ? (
//             <p>Loading...</p>
//           ) : (
//             filteredBooks?.map((item: any) => (
//               <div
//                 key={item.buku.id}
//                 className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="p-4">
//                   <h2 className="text-xl font-bold mb-2">{item.buku.judul}</h2>
//                   <p className="text-gray-700 mb-1">
//                     Penerbit: {item.buku.penerbit || "Tidak Diketahui"}
//                   </p>
//                   <p className="text-gray-700 mb-1">
//                     Penulis: {item.buku.penulis || "Tidak Diketahui"}
//                   </p>
//                   <p className="text-green-600 font-bold mb-4">
//                     Tahun Terbit: {item.buku.tahunTerbit || "Tidak Diketahui"}
//                   </p>
//                   <Button colorSchema="blue" title="Pinjam Buku Ini" />
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KategoriListComponent;

"use client";
import Button from "@/components/Button";
import { useMemo, useState } from "react";
import useBukuModule from "../lib";

const KategoriListComponent = () => {
  const { useKategoriRelasiList1 } = useBukuModule();
  const [selectedKategori, setSelectedKategori] = useState<number | null>(null);
  const { data: kategoriData, isLoading: isKategoriLoading } =
    useKategoriRelasiList1();

  const categoryImages:any = {
    Novel: "/buku3.jpg",
    Biografi: "/buku4.jpg",
    nonfiksi: "/buku4.jpg",
    // Tambahkan lebih banyak kategori dan gambar sesuai kebutuhan
  };
  // Extract unique categories
  const uniqueCategories = useMemo(() => {
    const categorySet = new Set();
    kategoriData?.data.forEach((item: any) => {
      categorySet.add(JSON.stringify(item.kategori));
    });
    return Array.from(categorySet).map((item: any) => JSON.parse(item));
  }, [kategoriData]);

  const handleKategoriClick = (kategoriId: number) => {
    setSelectedKategori(kategoriId);
  };

  const filteredBooks = selectedKategori
    ? kategoriData?.data.filter(
        (item: any) => item.kategori.id === selectedKategori
      )
    : kategoriData?.data;

  return (
    <div className="flex flex-col space-y-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
          <div
            className=" relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/buku2.jpg')" }}
            onClick={() => {
              setSelectedKategori(null);
            }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white">Semua Buku</div>
          </div>
          {uniqueCategories.map((kategori) => (
            <div
              key={kategori.id}
              className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${
                  categoryImages[kategori.nama_kategori] || "/buku5.jpg"
                })`,
              }}
              onClick={() => handleKategoriClick(kategori.id)}
            >
              <div className="absolute inset-0 bg-black opacity-60"></div>
              <div className="relative z-10 text-white">
                {kategori.nama_kategori}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isKategoriLoading ? (
            <p>Loading...</p>
          ) : (
            filteredBooks?.map((item: any) => (
              <div
                key={item.buku.id}
                className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{item.buku.judul}</h2>
                  <p className="text-gray-700 mb-1">
                    Penerbit: {item.buku.penerbit || "Tidak Diketahui"}
                  </p>
                  <p className="text-gray-700 mb-1">
                    Penulis: {item.buku.penulis || "Tidak Diketahui"}
                  </p>
                  <p className="text-green-600 font-bold mb-4">
                    Tahun Terbit: {item.buku.tahunTerbit || "Tidak Diketahui"}
                  </p>
                  <Button colorSchema="blue" title="Pinjam Buku Ini" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KategoriListComponent;
