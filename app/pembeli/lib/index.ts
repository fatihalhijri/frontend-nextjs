// import { BookCreateArrayPayload, BookCreatePayload, BookDeleteArrayPayload, BookDetailResponse, BookListFilter, BookListResponse, BookUpdatePayload } from "@/app/book/interface";
import { usePagination } from "@/hook/usePagination";
import { useToast } from "@/hook/useToast";
import { axiosClient } from "@/lib/axiousClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProdukCreateArrayPayload, ProdukCreatePayload, ProdukDeleteArrayPayload, ProdukDetailResponse, ProdukListFilter, ProdukListResponse, ProdukUpdatePayload } from "../interface";

const useProdukModule = () => {
  const queryClient = useQueryClient();
  const {toastError,toastSuccess,toastWarning} = useToast();
  const defaultParams:ProdukListFilter = {
    page: 1,
    pageSize: 10,
    nama_produk: "",
    barcode: "",
    deskripsi_produk: "",
    harga: 0,
    kategori_id: undefined,
    stok: 0,
  };
  // const defaultParams:ProdukListFilter = {
  //   page: 1,
  //   pageSize: 10,
  //   title: "",
  //   author: "",
  //   from_year: "",
  //   to_year: "",
  // };

  const getProdukList = async (
    params: ProdukListFilter
  ): Promise<ProdukListResponse> => {
    return axiosClient
      .get("/book/list", { params: params })
      .then((res) => res.data);
  };
  const useProdukList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
    } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/book/list", [filterParams]],
      () => getProdukList(filterParams),
      {
        keepPreviousData: true,

        select: (response) => response,
      }
    );

    return {
      data,
      isFetching,
      filterParams,
      isLoading,
      params,
      setParams,
      handlePage,
      handlePageSize,
      handleFilter,
      handleClear,
    };
  };

  // const createBook = (
  //   payload: BookCreatePayload
  // ): Promise<BookCreateResponse> => {
  //   return axiosClient.post(`/book/create`, payload).then((res) => res.data);
  // };

  const useCreateProduk = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ProdukCreatePayload) => {
        return axiosClient.post("/produk/create", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
        },
        onError: (error) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  // const updateBook = (
  //   payload: BookUpdatePayload,
  //   id: number
  // ): Promise<BookCreateResponse> => {
  //   return axiosClient
  //     .put(`/book/update/${id}`, payload)
  //     .then((res) => res.data);
  // };

  const useUpdateProduk = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: ProdukUpdatePayload) => {
        return axiosClient.put(`/produk/update/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/produk/detail"]);
        },

        onError: (error) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  
  
  
  const useDetailProduk = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/produk/detail", { id }],
      () => getDetailProduk(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  const getDetailProduk = async (id: string): Promise<ProdukDetailResponse> => {
    return axiosClient.get(`/produk/detail/${id}`).then((res) => res.data.data);
  };
  

  const useDeleteProduk = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/produk/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/produk/list"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );

    return { mutate, isLoading };
  };

  const useCreateBulkProduk = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ProdukCreateArrayPayload) => {
        return axiosClient.post("/produk/create/bulk", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
        },
        onError: (error) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  const useDeleteBulkProduk = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ProdukDeleteArrayPayload) => {
        return axiosClient.post("/produk/delete/bulk", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);

          queryClient.invalidateQueries(["/produk/list"]);
        },
        onError: (error) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };
  

 
  return {
    useProdukList,
    useCreateProduk,
    useDetailProduk,
    useUpdateProduk,
    useDeleteProduk,
    useDeleteBulkProduk,
    useCreateBulkProduk
  };
};

export default useProdukModule;
