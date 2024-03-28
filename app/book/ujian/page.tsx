
'use client'
import React, { useState } from 'react'
import useBookModule from '../lib';
import { useRouter } from 'next/navigation';
import { useClosure, useConfirmDelete } from '@/hook';
import { DeleteButton, EditButton } from '@/components/ButtonAction';
import { Drawer } from '@/components/Drawer';
import Filter from '../module/filter';
import Button from '@/components/Button';
import { Pagination } from '@/components/Pagination';


const CardScreen = () => {
  const { useBookList, useDeleteBook, useDeleteBulkBook } = useBookModule();
  const [deletePayload, setDeletePayload] = useState<number[]>([]);

  const { mutate, isLoading } = useDeleteBook();

  const router = useRouter();
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

  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutate(id);
    },
  });
  const { isOpen, onOpen, onClose } = useClosure();
  return (
    <div>
      <div>
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
      <div style={{display :'flex-row'}}>
      <Button
            onClick={() => {
              router.push("/book/tambah");
            }}
            width="sm"
            colorSchema="red"
            title="tambah"
          />
          <Button title="filter" width='sm' onClick={onOpen} colorSchema="blue"></Button>
      </div>
      <h1>Daftar Buku</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {isFetching ? "loading" : ""}
        {data?.data?.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '300px' }}>
            <img src={book.cover} alt={book.judul} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h2 className='text-base font-bold'>{book.judul}</h2>
            <p>Penulis: {book.penulis}</p>
            <p className='text-red-500'>Harga: {book.harga}</p>
            <p>Tahun Penerbit: {book.tahun_terbit}</p>
            <p>desc: {book.deskripsi}</p>
            {/* <p>is_Deleted: {book.is_deleted}</p> */}
            <p>Dibuat pada: {book.created_at}</p>
            <p>Diperbarui pada: {book.updated_at}</p>
            <div style={{display : 'flex-row'}}>
            <DeleteButton
                    isLoading={isLoading}
                    onClick={() => {
                      handleDelete(book.id || 0);
                    }}
                  />
                  <EditButton
                    onClick={() => {
                      router.push(`/book/${book.id}/edit`);
                    }}
                  />
            </div>
          </div>
        ))}
      </div>
      <Pagination
          page={params.page}
          pageSize={params.pageSize}
          handlePageSize={handlePageSize}
          handlePage={handlePage}
          pagination={data?.pagination}
        />
    </div>
    </div>
  )
}

export default CardScreen