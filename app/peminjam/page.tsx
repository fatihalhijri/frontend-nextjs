"use client";
import { Pagination } from "@/components/Pagination";

import Button from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/hook/useClosure";
import { useConfirmDeleteBulk } from "@/hook/useConfirmBulkDelete";
import { useConfirmDelete } from "@/hook/useConfirmDelete";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useBukuModule from "./lib";
import Filter from "./module/filter";

const Buku = () => {
  const { useBukuList, useDeleteBuku, useDeleteBulkBuku, useKategoriAll } =
    useBukuModule();
  const [deletePayload, setDeletePayload] = useState<number[]>([]);
  const { data: session, status } = useSession();
  // const {data,isFetching,} = useKategoriAll()

  const router = useRouter();
  const { mutate, isLoading } = useDeleteBuku();
  const { mutate: mutateDeleteBulk, isLoading: isLoadingDeleteBulk } =
    useDeleteBulkBuku();

  // useEffect(() => {
  //   if (session) {
  //     if (session.user.role !== "peminjam") {
  //       router.push("/notaccess");
        
  //     } 
  //     // if (session.user.role == "admin") {
  //     //   router.push("/admin");
  //     // } else {
  //     //   router.push("/peminjam");
  //     // }
  //   }
  // }, [session, router]);

  console.log("session", session);
  const {
    data,
    isFetching,
    filterParams,
    params,
    handlePage,
    handlePageSize,
    setParams,
    handleFilter,
    handleClear,
  } = useBukuList();

  const handleDeleteBulk = useConfirmDeleteBulk({
    onSubmit: (payload) => {
      console.log("payload", payload);
      mutateDeleteBulk(
        { data: payload },
        {
          onSuccess: () => {
            setDeletePayload([]);
          },
        }
      );
    },
  });

  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutate(id);
    },
  });

  const checked = useMemo(() => {
    if (!data) {
      return { isAllCheced: false };
    }
    const isAllChecked = data.data.every((n) => deletePayload.includes(n.id));

    return { isAllCheced: isAllChecked };
  }, [deletePayload, data]);

  const { isOpen, onOpen, onClose } = useClosure();
  // console.log("data", data);
  // console.log("isFetching", isFetching);
  // console.log("params", params);
  return (
    <div className="">
      {/* {JSON.stringify(session)} */}
      {/* {status} */}
      <Drawer
        title="Filter buku"
        isOpen={isOpen}
        onClose={onClose}
        onClear={handleClear}
        onSubmit={handleFilter}
      >
        <Filter params={params} setParams={setParams}></Filter>
      </Drawer>
      {/* {JSON.stringify(params)} */}
      <section className=" container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 ">
          <div
            className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            onClick={onOpen}
            style={{ backgroundImage: "url('/buku2.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white">Filter Buku</div>
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div
            className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/buku2.jpg')" }}
            onClick={() => {
              // useKategoriAll();
              router.push("/peminjam/kategoriall");
            }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white">Semua Buku</div>
          </div>

          <div
            className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/buku5.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white">Biografi</div>
          </div>
          <div
            className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/buku3.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white">Non-Fiksi</div>
          </div>
          <div
            className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/buku4.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white">Fiksi</div>
          </div>
        </div>

        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 "
                onClick={() => {
                  router.push(`peminjam/detail/${item.id}`);
                }}
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{item.judul}</h2>
                  <p className="text-gray-700 mb-1">
                    Penerbit: {item.penerbit}
                  </p>
                  <p className="text-gray-700 mb-1">Penulis: {item.penulis}</p>
                  <p className="text-green-600 font-bold mb-4">
                    tahunTerbit: {item.tahunTerbit}
                  </p>
                  <Button colorSchema="blue" title="Pinjam Buku Ini"></Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Pagination
          page={params.page}
          pageSize={params.pageSize}
          handlePageSize={handlePageSize}
          handlePage={handlePage}
          pagination={data?.pagination}
        />
      </section>
    </div>
  );
};

export default Buku;
