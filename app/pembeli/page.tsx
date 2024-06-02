'use client'
import React, { useState } from 'react'
import useBookModule from '../buku/lib';
import { useRouter } from 'next/navigation';
import { useClosure, useConfirmDelete } from '@/hook';

const Pembeli = () => {
  const { useBookList, useDeleteBook, useDeleteBulkBook } =
    useBookModule();
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
    <div>Uas Pembeli</div>
  )
}

export default Pembeli