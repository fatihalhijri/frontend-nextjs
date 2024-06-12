import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { usePagination } from "@/hook/usePagination";
import { useToast } from "@/hook/useToast";
import { axiosClient } from "@/lib/axiousClient";
import { useSession } from "next-auth/react";
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
  KategoriRelasiResponse,
  KategoriResponse,
} from "../interface";
import { option } from "../module/filter";
import { number } from "yup";

const useBukuModule = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const router = useRouter();
  const defaultParams: BukuListFilter = {
    page: 1,
    pageSize: 8,
    judul: "",
    penulis: "",
    // kategori_id: undefined||null||0,
    dari_tahun: "",
    ke_tahun: "",
  };

  // const getBukuList = async (
  //   params: BukuListFilter
  // ): Promise<BukuListResponse> => {
  //   return axiosClient
  //     .get("/buku/list", { params: params })
  //     .then((res) => res.data);
  // };
  // const useBukuList = () => {
  //   const {
  //     params,
  //     setParams,
  //     handleFilter,
  //     handleClear,
  //     handlePageSize,
  //     handlePage,
  //     filterParams,
  //   } = usePagination(defaultParams);

  //   const { data, isFetching, isLoading, isError } = useQuery(
  //     ["/buku/list", [filterParams]],
  //     () => getBukuList(filterParams),
  //     {
  //       keepPreviousData: true,
  //       // enabled: !!session === false,
  //       select: (response) => response,
  //     }
  //   );

  //   return {
  //     data,
  //     isFetching,
  //     filterParams,
  //     isLoading,
  //     params,
  //     setParams,
  //     handlePage,
  //     handlePageSize,
  //     handleFilter,
  //     handleClear,
  //   };
  // };
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
  // const getKategoriList = async (): // params: BukuListFilter
  // Promise<BukuListResponse> => {
  //   return axiosClient
  //     .get("/kategorirelasi/list?page=1&pageSize=100")
  //     .then((res) => res.data);
  // };
  // const useKategoriList = () => {
  //   const { data, isFetching, isLoading, isError } = useQuery(
  //     ["/kategorirelasi/list?page=1&pageSize=100"],
  //     () => getKategoriList(),
  //     {
  //       keepPreviousData: true,
  //       // enabled: !!session === false,
  //       select: (response) => response,
  //     }
  //   );

  //   return {
  //     data,
  //     isFetching,
  //     isLoading,
  //   };
  // };

  // const getKategoriAll = async (): Promise<BukuDetailResponse> => {
  //   return axiosClient
  //     .get("/kategorirelasi/list?page=1&pageSize=100")
  //     .then((res) => res.data);
  // };

  // const useKategoriAll = () => {
  //   const { data, isLoading, isFetching } = useQuery(
  //     ["/kategorirelasi/list?page=1&pageSize=100"],
  //     () => getKategoriAll(),
  //     {
  //       select: (response) => response,
  //       // enabled: !!session === true,
  //     }
  //   );

  //   return { data, isFetching, isLoading };
  // };

  // `````````````````````cara paling benar untuk mengambil kategori
  const getKategoriList1 = async (): Promise<KategoriRelasiResponse> => {
    return axiosClient
      .get("/kategorirelasi/list")
      .then((res) => res.data);
  };

  const useKategoriAll2 = () => {
    const { data, isFetching, isLoading } = useQuery(
      ["/kategorirelasi/list"],
      getKategoriList1,
      {
        keepPreviousData: true,
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };
  const getKategoriRelasiList1 = async (): Promise<any> => {
    return axiosClient.get("/kategorirelasi/list?page=1&pageSize=100").then((res) => res.data);
  };
  
   const useKategoriRelasiList1 = () => {
    return useQuery(["/kategorirelasi/list"], getKategoriRelasiList1, {
      keepPreviousData: true,
    });
  };

  const getBukuByKategori = async (
    kategoriId: number | null
  ): Promise<BukuListResponse> => {
    // if (kategoriId === null) return { data: [] }; // Jika tidak ada kategori yang dipilih, kembalikan array kosong
    return axiosClient
      .get(`/buku/list?id=${kategoriId}`)
      .then((res) => res.data);
  };

  const useBukuByKategori = (kategoriId: number | null) => {
    const { data, isFetching, isLoading } = useQuery(
      ["/buku/list", kategoriId],
      () => getBukuByKategori(kategoriId),
      {
        keepPreviousData: true,
        enabled: kategoriId !== null, // Hanya jalankan query jika kategoriId tidak null
      }
    );

    return { data, isFetching, isLoading };
  };

  // const getKategoriList1 = async (): Promise<KategoriRelasiResponse> => {
  //   return axiosClient.get("/kategorirelasi/list?page=1&pageSize=100").then((res) => res.data);
  // };
  
  // const getBukuByKategori = async (kategoriId: number): Promise<BukuDetailResponse[]> => {
  //   return axiosClient.get(`/buku/byKategori/${kategoriId}`).then((res) => res.data);
  // };
  
  //  const useKategoriAll1 = () => {
  //   return useQuery(["/kategorirelasi/list"], getKategoriList1, {
  //     keepPreviousData: true,
  //   });
  // };
  
  //  const useBukuByKategori = (kategoriId: number) => {
  //   return useQuery(["/buku/list", kategoriId], () => getBukuByKategori(kategoriId), {
  //     enabled: !!kategoriId,
  //   });
  // };
  

  // const getKategoriBiologi = async (): Promise<KategoriResponse> => {
  //   return axiosClient.get("/kategorirelasi/list?nama_kategori=Biografi").then((res) => res.data);
  // };

  // const useKategoriBiologi = () => {
  //   const { data, isFetching, isLoading } = useQuery(
  //     ["/kategorirelasi/list?nama_kategori=Biografi",],
  //     getKategoriBiologi,
  //     {
  //       keepPreviousData: true,
  //       // enabled: id !== null,
  //       select: (response) => response,
  //     }
  //   );

  //   return { data, isFetching, isLoading };
  // };
  const getKategoriBiologi = async (): Promise<BukuListResponse> => {
    return axiosClient
      .get("/kategorirelasi/list?nama_kategori=Biografi")
      .then((res) => res.data);
  };
  const useKategoriBiologi = () => {
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/kategorirelasi/list?nama_kategori=Biografi"],
      () => getKategoriBiologi(),
      {
        keepPreviousData: true,
        // enabled: !!session === false,
        select: (response) => response,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
    };
  };
  const getKategoriFiksi = async (): Promise<BukuListResponse> => {
    return axiosClient
      .get("/kategorirelasi/list?nama_kategori=novel")
      .then((res) => res.data);
  };
  const useKategoriFiksi = () => {
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/kategorirelasi/list?nama_kategori=novel"],
      () => getKategoriFiksi(),
      {
        keepPreviousData: true,
        // enabled: !!session === false,
        select: (response) => response,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
    };
  };
  const getKategoriNonFiksi = async (): Promise<BukuListResponse> => {
    return axiosClient
      .get("/kategorirelasi/list?nama_kategori=non-fiksi")
      .then((res) => res.data);
  };
  const useKategoriNonFiksi = () => {
    const { data, isFetching, isLoading, isError } = useQuery(
      ["/kategorirelasi/list?nama_kategori=non-fiksi"],
      () => getKategoriFiksi(),
      {
        keepPreviousData: true,
        // enabled: !!session === false,
        select: (response) => response,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
    };
  };
  //`````````````
  //cara ke 3
  // const getKategoriRelasiList = async (): Promise<any> => {
  //   return axiosClient
  //     .get(`/kategorirelasi/list?page=1&pageSize=100`)
  //     .then((res) => res.data.data);
  // };

  // const useKategoriAll = () => {
  //   const { data, isLoading, isFetching } = useQuery(
  //     ["/kategorirelasi/list"],
  //     getKategoriRelasiList,
  //     {
  //       select: (response) => response,
  //       enabled: true, // Ensure the query is enabled
  //     }
  //   );

  //   return { data, isFetching, isLoading };
  // };
  //cara ke 4
  const getKategoriList = async (): Promise<KategoriRelasiResponse> => {
    return axiosClient
      .get("/kategorirelasi/list?page=1&pageSize=100")
      .then((res) => res.data);
  };
  const useKategoriAll = () => {
    const { data, isFetching, isLoading } = useQuery(
      ["/kategorirelasi/list"],
      () => getKategoriList(),
      {
        // keepPreviousData: true,

        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  const getKategoriRelasiList = async (): Promise<any> => {
    return axiosClient
      .get(`/kategorirelasi/list?page=1&pageSize=100`)
      .then((res) => res.data.data);
  };

  // Define a custom hook to use the Kategori Relasi list
  const useKategoriRelasiList = () => {
    return useQuery(["/kategorirelasi/list"], getKategoriRelasiList, {
      select: (response) => response,
      enabled: false, // Disable automatic fetching
    });
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
          // router.push("/admin");
          if (response.data.role === "admin") {
            return router.push("/admin");
          }
          if (response.data.role === "petugas") {
            return router.push("/petugas");
          }
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
          // router.push("/admin");
          if (response.data.role === "admin") {
            return router.push("/admin");
          }
          if (response.data.role === "petugas") {
            return router.push("/petugas");
          }
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
          // router.push("/admin");
          if (response.data.role === "admin") {
            return router.push("/admin");
          }
          if (response.data.role === "petugas") {
            return router.push("/petugas");
          }
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
          // router.push("/admin");
          if (response.data.role === "admin") {
            return router.push("/admin");
          }
          if (response.data.role === "petugas") {
            return router.push("/petugas");
          }
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

  const getKoleksi = async (id: string): Promise<BukuDetailResponse> => {
    return axiosClient.get(`/koleksi/list/${id}`).then((res) => res.data.data);
  };

  const useKoleksi = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/koleksi/list", { id }],
      () => getKoleksi(id),
      {
        select: (response) => response,
        enabled: !!session === true,
      }
    );

    return { data, isFetching, isLoading };
  };
  const getUlasan = async (id: string): Promise<BukuDetailResponse> => {
    return axiosClient.get(`/ulasan/detail/${id}`).then((res) => res.data.data);
  };

  const useUlasan = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/ulasan/list", { id }],
      () => getUlasan(id),
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
    useCreateUlasanBuku,
    useKategoriFiksi,
    useKategoriNonFiksi,
    useKoleksi,
    useUlasan,
    useBukuByKategori,
    useKategoriAll2,
    useKategoriRelasiList1,
    useKategoriBiologi,
    useKategoriRelasiList,
    useKategoriAll,
  };
};

export default useBukuModule;
