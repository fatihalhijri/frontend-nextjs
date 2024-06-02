import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { usePagination } from "@/hook/usePagination";
import { useToast } from "@/hook/useToast";
import { axiosClient } from "@/lib/axiousClient";
import { useRouter } from "next/navigation";
import {
  BukuCreateArrayPayload,
  BukuCreatePayload,
  BukuDeleteArrayPayload,
  BukuDetailResponse,
  BukuListFilter,
  BukuListResponse,
  BukuUlasanCreatePayload,
  BukuUpdatePayload,
} from "../interface";
import { useSession } from "next-auth/react";

const useBukuModule = () => {
  const queryClient = useQueryClient();
  const {data:session} = useSession();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const router = useRouter();
  const defaultParams: BukuListFilter = {
    page: 1,
    pageSize: 10,
    judul: "",
    penulis: "",
    dari_tahun: "",
    ke_tahun: "",
  };

  const getBukuList = async (
    params: BukuListFilter
  ): Promise<BukuListResponse> => {
    return axiosClient
      .get("/buku/list", { params: params })
      .then((res) => res.data);
  };
  const useBukuList = () => {
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
      ["/buku/list", [filterParams]],
      () => getBukuList(filterParams),
      {
        keepPreviousData: true,
        // enabled: !!session === false,
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

  // const createBuku = (
  //   payload: BukuCreatePayload
  // ): Promise<BukuCreateResponse> => {
  //   return axiosClient.post(`/buku/create`, payload).then((res) => res.data);
  // };

  const useCreateBuku = () => {
    const { mutate, isLoading } = useMutation(
      (payload: BukuCreatePayload) => {
        return axiosClient.post("/buku/create", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          router.push("/buku");
        },
        onError: (error) => {
          toastError();

        },
      }
    );
    return { mutate, isLoading };
  };
  const useCreateUlasanBuku = () => {
    const { mutate, isLoading } = useMutation(
      (payload: BukuUlasanCreatePayload) => {
        return axiosClient.post("/ulasan/create", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          // router.push("/login");
        },
        onError: (error) => {
          toastError();

        },
      }
    );
    return { mutate, isLoading };
  };


  const useCreateBulkBuku = () => {
    const { mutate, isLoading } = useMutation(
      (payload: BukuCreateArrayPayload) => {
        return axiosClient.post("/buku/create/bulk", payload);
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

  // const updateBuku = (
  //   payload: BukuUpdatePayload,
  //   id: number
  // ): Promise<BukuCreateResponse> => {
  //   return axiosClient
  //     .put(`/Buku/update/${id}`, payload)
  //     .then((res) => res.data);
  // };

  const useUpdateBuku = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: BukuUpdatePayload) => {
        return axiosClient.put(`/buku/update/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/buku/detail"]);
        },

        onError: (error) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };
  
  // const getDetailBukuUpdate = async (id: string): Promise<BukuDetailResponse> => {
  //   return axiosClient.get(`/buku/detail/${id}`).then((res) => res.data.data);
  // };
  
  const getDetailBuku = async (id: string): Promise<BukuDetailResponse> => {
    return axiosClient.get(`/buku/detail/${id}`).then((res) => res.data.data);
  };

  const useDetailBuku = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/buku/detail", { id }],
      () => getDetailBuku(id),
      {
        select: (response) => response,
        enabled: !!session === true,
      }
    );

    return { data, isFetching, isLoading };
  };
  // const useDetailBuku = (id: string) => {
  //   const { data, isLoading, isFetching } = useQuery(
  //     ["/buku/detail", { id }],
  //     () => getDetailBuku(id),
  //     {
  //       select: (response) => response,
  //     }
  //   );

  //   return { data, isFetching, isLoading };
  // };

 
  


  const useDeleteBuku = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/buku/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/buku/list"]);
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


  const useDeleteBulkBuku = () => {
    const { mutate, isLoading } = useMutation(
      (payload: BukuDeleteArrayPayload) => {
        return axiosClient.post("/buku/delete/bulk", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);

          queryClient.invalidateQueries(["/buku/list"]);
        },
        onError: (error) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  return {
    useBukuList,
    useCreateBuku,
    useDetailBuku,
    useUpdateBuku,
    useDeleteBuku,
    useDeleteBulkBuku,
    useCreateBulkBuku,
    // useDetailBukuUpdate,
    useCreateUlasanBuku
  };
};

export default useBukuModule;
