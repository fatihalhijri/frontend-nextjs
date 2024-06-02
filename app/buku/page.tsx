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
import useBukuModule from "./lib";
import Filter from "./module/filter";

const Buku = () => {
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
      <section className=" container mx-auto px-4 sm:px-6 lg:px-8">
        {/* {isFetching ? "loading" : ""} */}
        <div className="grid grid-cols-5 gap-5 py-5">
          <Button title="filter" onClick={onOpen} colorSchema="blue"></Button>

          <Button
            width="sm"
            onClick={() => {
              handleDeleteBulk(deletePayload);
            }}
            // isLoading={isLoadingDeleteBulk}
            colorSchema="red"
            isDisabled={deletePayload.length === 0}
            title="Hapus "
          />
          <Button
            onClick={() => {
              router.push("/buku/tambah");
            }}
            width="sm"
            colorSchema="red"
            title="tambah"
          />

          <Button
            onClick={() => {
              router.push("/buku/tambah-bulk");
            }}
            height="md"
            width="sm"
            colorSchema="green"
            title="tambah bulk"
          />
        </div>
        {/* <Table>
          <Thead>
            <Tr>
              <Th scope="col">
                <div className="flex items-center gap-x-3">
                  <input
                    checked={checked.isAllCheced}
                    onChange={() => {
                      if (checked.isAllCheced) {
                        setDeletePayload([]);
                      } else {
                        setDeletePayload((state) => {
                          if (!data) {
                            return [];
                          }
                          
                          const selected: number[] = Array.from(
                            new Set([
                              ...state,
                              ...data?.data?.map((n) => Number(n.id)),
                            ])
                          );

                          return [...selected];
                        });
                      }
                    }}
                    type="checkbox"
                    className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                    />
                </div>
              </Th>
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
                  <input
                    checked={deletePayload.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDeletePayload((state) => [...state, item.id]);
                      } else {
                        const filtered = deletePayload.filter(
                          (n) => n !== item.id
                        );
                        setDeletePayload(filtered);
                      }
                    }}
                    type="checkbox"
                    className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                  />
                </Td>
                <Td>
                  <span>{(params.page - 1) * params.pageSize + index + 1}</span>
                </Td>
                <Td>
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
                      router.push(`buku/edit/${item.id}`);
                    }}
                    />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table> */}

        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 "
                onClick={() => {
                  router.push(`buku/detail/${item.id}`);
                }}
              >
                {/* <img
                  src={item.imageUrl}
                  alt={item.judul}
                  className="w-full h-48 object-cover"
                /> */}
                <div className="p-4" >
                  <h2 className="text-xl font-bold mb-2">{item.judul}</h2>
                  <p className="text-gray-700 mb-1">
                    Penerbit: {item.penerbit}
                  </p>
                  <p className="text-gray-700 mb-1">Penulis: {item.penulis}</p>
                  <p className="text-green-600 font-bold mb-4">
                    tahunTerbit: {item.tahunTerbit}
                  </p>
                  <Button colorSchema="blue" title="Pinjam Buku Ini" >
                    {/* Pinjam Buku Ini */}
                  </Button>
                  {/* <DeleteButton
                    isLoading={isLoading}
                    onClick={() => {
                      handleDelete(item.id || 0);
                    }}
                    />
                  <EditButton
                    onClick={() => {
                      router.push(`buku/edit/${item.id}`);
                    }}
                    /> */}
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
