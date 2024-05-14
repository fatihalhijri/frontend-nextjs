import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookCreateArrayPayload,
  BookCreateDto,
  BookCreatePayload,
  BookCreateResponse,
  BookDeleteArrayPayload,
  BookDetailResponse,
  BookListFilter,
  BookListResponse,
  BookUpdatePayload,
  BookUploadResponse,
  FormArrayPayload,
  UjianCreateArrayPayload,
  UpdateBook,
} from "../interface";
import { axiosClient } from "@/lib/axiousClient";
import { ChangeEvent, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { usePagination } from "@/hook/usePagination";
import Swal from "sweetalert2";
import { useToast } from "@/hook/useToast";
import { ProfileResponse, ProfileUpdatePayload } from "@/app/auth/interface";
import useAxiosAuth from "@/hook/useAxiousAuth";
import useUploadFile from "@/hook/useUploadFile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import router from "next/router";

const useBookModule = () => {
  const queryClient = useQueryClient();
  const {toastError,toastSuccess,toastWarning} = useToast();
  const axiosAuthClient = useAxiosAuth();
  const {uploadSingle} = useUploadFile();
  const { data: session } = useSession();
  const router = useRouter();
  const defaultParams:BookListFilter = {
    page: 1,
    pageSize: 10,
    judul: "",
    penulis: "",
    from_year: "",
    to_year: "",
  };

  const getBookList = async (
    params: BookListFilter
  ): Promise<BookListResponse> => {
    return axiosClient
      .get("/book/list", { params: params })
      .then((res) => res.data);
  };
  const useBookList = () => {
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
      () => getBookList(filterParams),
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
  const createBook = async (
    payload: BookCreateDto
  ): Promise<BookCreateResponse> => {
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);


      payload = {
        ...payload,
        cover: res.data.file_url,
      };
    }
    return axiosAuthClient
      .post(`/book/create`, payload)
      .then((res) => res.data);
  };
  

  // const useCreateBook = () => {
  //   const { mutate, isLoading } = useMutation(
  //     (payload: BookCreatePayload) => {
  //       return axiosClient.post("/book/create", payload);
  //     },
  //     {
  //       onSuccess: (response) => {
  //         toastSuccess(response.data.message);
  //       },
  //       onError: (error) => {
  //         toastError();
  //       },
  //     }
  //   );
  //   return { mutate, isLoading };
  // };
  const useCreateBook = () => {
    const { isLoading, mutate } = useMutation(
      (payload: BookCreateDto) => createBook(payload),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
          router.push("/ujian");
        },
        onError: (gagal) => {
          console.log("error", gagal);
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

  // const useUpdateBook = (id: number) => {
  //   const { isLoading, mutate } = useMutation(
  //     async (payload: BookUpdatePayload) => 
  //       {
  //         if (payload.file !== undefined) {
  //           const res = await uploadSingle(payload.file);
  //           console.log('res', res);
  //           payload = {
  //             ...payload,
  //             cover: res.data.file_url,
  //           };
  //         }
  //       return axiosClient.put(`/book/update/${id}`, payload);
  //     },
  //     {
  //       onSuccess: (response) => {
  //         toastSuccess(response.data.message);
  //         // queryClient.invalidateQueries(["/book/detail"]); 
  //         queryClient.invalidateQueries(["/auth/profile"]);
  //       },

  //       onError: (error:any) => {
  //         if (error.response.status == 422) {
  //           return toastWarning(error.response.data.message);
  //         }

  //         if (error.response.status == 400) {
  //           return toastWarning(error.response.data.message.toString());
  //         }
  //         toastError();
  //       },
  //     }
  //   );
  //   return { mutate, isLoading };
  // };

  const updateBook = async (
    payload: UpdateBook,
    id: number
  ): Promise<BookCreateResponse> => {
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);

      payload = {
        ...payload,
        cover: res.data.file_url,
      };
    }
    return axiosAuthClient
      .put(`/book/update/${id}`, payload)
      .then((res) => res.data);
  };

  const useUpdateBook = (id: number) => {
    const { isLoading, mutate, data } = useMutation(
      (payload: UpdateBook) => updateBook(payload, id),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
          router.push("/ujian");
        },
        onError: (error: any) => {
          console.log('gagal',error)
          toastError();
        },
      }
    );
    return { mutate, isLoading, data };
  };
  
  
  const useDetailBook = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/book/detail", { id }],
      () => getDetailBook(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  const getDetailBook = async (id: string): Promise<BookDetailResponse> => {
    return axiosClient.get(`/book/detail/${id}`).then((res) => res.data.data);
  };
  

  const useDeleteBook = () => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosClient.delete(`/book/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/book/list"]);
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

  
  const useCreateBulkBook = () => {
    const { mutate, isLoading } = useMutation(
      (payload: BookCreateArrayPayload) => {
        return axiosClient.post("/book/create/bulk", payload);
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

  const useDeleteBulkBook = () => {
    const { mutate, isLoading } = useMutation(
      (payload: BookDeleteArrayPayload) => {
        return axiosClient.post("/book/delete/bulk", payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);

          queryClient.invalidateQueries(["/book/list"]);
        },
        onError: (error) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };
  const getProfile = async (): Promise<ProfileResponse> => {
    return axiosAuthClient.get("/auth/profile").then((res) => res.data);
  };
  const useProfile = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["/auth/profile"],
      () => getProfile(),
      {
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        // enabled: session?.user?.id !== undefined,
        enabled: !!session === true,
      }
    );

    return { data, isFetching, isLoading };
  };
  const updateProfileBook = async (
    payload: ProfileUpdatePayload
  ): Promise<ProfileResponse> => {
    console.log('payload',payload)
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);
      

      payload = {
        ...payload,
        cover: res.data.file_url,
      };
    }

    return axiosAuthClient
      .put("/book/update", payload)
      .then((res) => res.data);
  };
  const updateProfile = async (
    payload: ProfileUpdatePayload
  ): Promise<ProfileResponse> => {
    console.log('payload',payload)
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);
      

      payload = {
        ...payload,
        cover: res.data.file_url,
      };
    }

    return axiosAuthClient
      .put("/book/update", payload)
      .then((res) => res.data);
  };

  const useUpdateProfile = () => {
    const { mutate, isLoading } = useMutation(
      (payload: ProfileUpdatePayload) => updateProfile(payload),
      {
        onSuccess: async (response) => {
          toastSuccess(response.message);
          queryClient.invalidateQueries(["/auth/profile"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            return toastWarning(error.response.data.message);
          }

          if (error.response.status == 400) {
            return toastWarning(error.response.data.message.toString());
          }

          toastError();
        },
      }
    );

    return { mutate, isLoading };
  };

  

 
  return {
    useBookList,
    useCreateBook,
    useDetailBook,
    useUpdateBook,
    useDeleteBook,
    useDeleteBulkBook,
    useCreateBulkBook,
    useUpdateProfile,
    useProfile
  };
};

export default useBookModule;
