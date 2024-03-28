"use client";
import { Pagination } from "@/components/Pagination";

import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/Tabel";

import { useQuery } from "@tanstack/react-query";
import { BookListResponse } from "./interface";
import { axiosClient } from "@/lib/axiousClient";
import { dateUtil } from "@/utils";
import useBookModule from "./lib";
import { Drawer } from "@/components/Drawer";
import { useClosure } from "@/hook/useClosure";
import Button from "@/components/Button";
import Filter from "./module/filter";
import { useRouter } from "next/navigation";
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import Swal from "sweetalert2";
import { useConfirmDelete } from "@/hook/useConfirmDelete";
import { useConfirmDeleteBulk } from "@/hook/useConfirmBulkDelete";
import { useMemo, useState } from "react";

const Book = () => {
  const { useBookList, useDeleteBook, useDeleteBulkBook } = useBookModule();
  const [deletePayload, setDeletePayload] = useState<number[]>([]);

  const { mutate, isLoading } = useDeleteBook();

  const router = useRouter();
  const { mutate: mutateDeleteBulk, isLoading: isLoadingDeleteBulk } =
    useDeleteBulkBook();

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
  } = useBookList();

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
    <>
      <Drawer
        title="Filter buku"
        isOpen={isOpen}
        onClose={onClose}
        onClear={handleClear}
        onSubmit={handleFilter}
      >
        <Filter params={params} setParams={setParams}></Filter>
      </Drawer>
      {JSON.stringify(params)}
      <section className="container px-4 mx-auto pt-10 ">
        {isFetching ? "loading" : ""}
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
              router.push("/book/tambah");
            }}
            width="sm"
            colorSchema="red"
            title="tambah"
          />
          <Button
            onClick={() => {
              router.push("/book/tambah-bulk");
            }}
            height="md"
            width="sm"
            colorSchema="green"
            title="tambah bulk"
          />
        </div>
        <Table>
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
              <Th scope="col">Tahun</Th>
              <Th scope="col">Cover</Th>
              <Th scope="col">Tanggal Dibuat</Th>
              <Th scope="col">Tanggal diperbarui</Th>

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
                  <span>{item.tahun_terbit}</span>
                </Td>
                <Td>
                  <span>{item.cover}</span>
                </Td>
                <Td>
                  <span>{dateUtil.formatDateTime(item.created_at)}</span>
                </Td>
                <Td>
                  <span>{dateUtil.formatDateTime(item.updated_at)}</span>
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
                      router.push(`book/${item.id}/edit`);
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
    </>
  );
};

export default Book;
