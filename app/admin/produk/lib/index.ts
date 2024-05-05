"use client";
import { usePagination, useToast } from "@/hook";
import { ProdukCreateArrayPayload, ProdukListFilter, ProdukListResponse } from "../interface";
import { axiosClient } from "@/lib/axiousClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hook/useAxiousAuth";
import Swal from "sweetalert2";

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
    return axiosAuthClient
      .get("/produk/list", { params })
      .then((res) => res.data);
  };
  const useProdukList = () => {
    const { filterParams } = usePagination(defaultParams);

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

  const useCreateProdukBulk = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ProdukCreateArrayPayload) => {
        return axiosAuthClient.post("/produk/create-bulk", payload);
      },
      {
        onSuccess: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
        },
        onError: (error) => {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Ada Kesalahan",
            showConfirmButton: false,
            timer: 1000,
          });
        },
      }
    );
    return { mutate, isLoading };
  };

  return {
    useProdukList,
  };
};

export default useProdukModule;
