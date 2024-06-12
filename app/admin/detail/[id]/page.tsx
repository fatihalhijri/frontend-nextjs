"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import useBukuModule from "@/app/peminjam/lib";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/Tabel";
import { DeleteButton, EditButton } from "@/components/ButtonAction";
import { useConfirmDelete } from "@/hook/useConfirmDelete";

const DetailBukuAdmin = ({ params }: { params: { id: string } }) => {
  const { useDetailBuku,useDeleteBuku } = useBukuModule();
  const { data: data, isFetching, isLoading } = useDetailBuku(params.id);
  const [deletePayload, setDeletePayload] = useState<number[]>([]);
  const { data: session, status } = useSession();
  const { mutate  } = useDeleteBuku();
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutate(id);
    },
  });
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-4">
        <h1 className="text-lg font-bold ">Detail Buku</h1>
        <hr className="border-1 border " />
      </div>
      <Table>
          <Thead>
            <Tr>
              
              {/* <Th scope="col">No</Th> */}
              <Th scope="col">judul</Th>
              <Th scope="col">Penulis</Th>
              <Th scope="col">Penerbit</Th>
              <Th scope="col">TahunTerbit</Th>
              <Th scope="col">Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&(
              <Tr  >
                
                {/* <Td>
                  <span>{(params.page - 1) * params.pageSize + index + 1}</span>
                </Td> */}
                <Td onClick={() => {
                  router.push(`admin/detail/${data.id}`);
                }}>
                  <span>{data.judul}</span>
                </Td>
                <Td>
                  <span>{data.penulis}</span>
                </Td>
                <Td>
                  <span>{data.penerbit}</span>
                </Td>
                <Td>
                  <span>{data.tahunTerbit}</span>
                </Td>
                <Td>
                  <DeleteButton
                    isLoading={isLoading}
                    onClick={() => {
                      handleDelete(data.id || 0);
                    }}
                  />
                  <EditButton
                    onClick={() => {
                      router.push(`buku/edit/${data.id}`);
                    }}
                  />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      <div className="py-4">
        <h1 className="text-lg font-bold ">Ulasan Buku</h1>
        <hr className="border-1 border " />
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
    </div>
  );
};
export default DetailBukuAdmin;
