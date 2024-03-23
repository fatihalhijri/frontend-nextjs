"use client";
import { usePagination, useToast } from "@/hook";
import { ProdukListFilter, ProdukListResponse } from "../interface";
import { axiosClient } from "@/lib/axiousClient";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hook/useAxiousAuth";

const useProdukModule = () => {
  const { data: produk } = useSession();
  const axiosAuthClient = useAxiosAuth();

  const defaultParams: ProdukListFilter = {
    page: 1,
    pageSize: 10,
    // nama_produk: "",
    // deskripsi: "",
    // harga: "",
    // dari_tahun: "",
    // akhir_tahun: "",
  };
  const getProdukList = async (
    params: ProdukListFilter
  ): Promise<ProdukListResponse> => {
    return axiosAuthClient.get("/produk/list", { params }).then((res) => res.data);
  };
  const useProdukList = () => {
    const {
      
      filterParams,
    } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/produk/list", [filterParams]],
      () => getProdukList(filterParams),
      {
        select: (response) => response,
        keepPreviousData: true,
        // enabled: !!produk === true,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
      
    };
  };
  return {
    useProdukList,
  };
};

export default useProdukModule;
