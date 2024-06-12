"use client";
import { Pagination } from "@/components/Pagination";

import Button from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/hook/useClosure";
import { useConfirmDeleteBulk } from "@/hook/useConfirmBulkDelete";
import { useConfirmDelete } from "@/hook/useConfirmDelete";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useBukuModule from "../peminjam/lib";
import Filter from "../peminjam/module/filter";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/Tabel";
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import "./globals.css";

const Petugas = () => {
  const { useBukuList, useDeleteBuku, useDeleteBulkBuku } = useBukuModule();
  const [deletePayload, setDeletePayload] = useState<number[]>([]);
  const { data: session, status } = useSession();

  const router = useRouter();
  const { mutate, isLoading } = useDeleteBuku();
  const { mutate: mutateDeleteBulk, isLoading: isLoadingDeleteBulk } =
    useDeleteBulkBuku();

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
      <section className=" container mx-auto  px-4 sm:px-6 lg:px-8">
        {/* {isFetching ? "loading" : ""} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 ">
          <div className=""></div>
          {/* <div
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat  backdrop-brightness-50"
            style={{ backgroundImage: "url('/buku2.jpg')" }}
            onClick={onOpen}
          >
            <p className="">Filter Buku</p>
          </div> */}
          <div
            className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            onClick={onOpen}
            style={{ backgroundImage: "url('/buku2.jpg')" }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white">Filter Buku</div>
          </div>
          <div
            className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/buku3.jpg')" }}
            onClick={() => {
              router.push("/petugas/tambah");
            }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white">Tambah Buku</div>
          </div>
          {/* <div
            className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20  flex justify-center items-center bg-cover bg-center bg-no-repeat "
            style={{ backgroundImage: "url('/buku3.jpg')", background:'backdrop-blur-sm bg-slate-200'}}
            onClick={() => {
              router.push("/petugas/tambah");
            }}
            >
            <p className="">Tambah Buku</p>
          </div> */}
          <div
            className="relative border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-xl font-serif text-center md:h-20 h-20 flex justify-center items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/buku3.jpg')" }}
            onClick={() => {
              router.push("/petugas/tambah-bulk");
            }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 text-white">Tambah Banyak Buku</div>
          </div>
        </div>
        <Table >
          <Thead>
            <Tr>
              <Th scope="col">No</Th>
              <Th scope="col">judul</Th>
              <Th scope="col">Penulis</Th>
              <Th scope="col">Penerbit</Th>
              <Th scope="col">TahunTerbit</Th>
              <Th scope="col">Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <span>{(params.page - 1) * params.pageSize + index + 1}</span>
                </Td>
                <Td
                  onClick={() => {
                    router.push(`petugas/detail/${item.id}`);
                  }}
                >
                  <span>{item.judul}</span>
                </Td>
                <Td>
                  <span>{item.penulis}</span>
                </Td>
                <Td>
                  <span>{item.penerbit}</span>
                </Td>
                <Td>
                  <span>{item.tahunTerbit}</span>
                </Td>
                <Td>
                  <DeleteButton
                    isLoading={isLoading}
                    onClick={() => {
                      handleDelete(item.id || 0);
                    }}
                  />
                  <EditButton
                    onClick={() => {
                      router.push(`petugas/edit/${item.id}`);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

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

export default Petugas;
