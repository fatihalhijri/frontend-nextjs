import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookCreateArrayPayload,
  BookCreatePayload,
  BookCreateResponse,
  BookDeleteArrayPayload,
  BookDetailResponse,
  BookListFilter,
  BookListResponse,
  BookUpdatePayload,
  FormArrayPayload,
  UjianCreateArrayPayload,
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

const useBookModule = () => {
  const queryClient = useQueryClient();
  const {toastError,toastSuccess,toastWarning} = useToast();
  const axiosAuthClient = useAxiosAuth();
  const {uploadSingle} = useUploadFile();
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

  const useCreateBook = () => {
    const { mutate, isLoading } = useMutation(
      (payload: BookCreatePayload) => {
        return axiosClient.post("/book/create", payload);
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

  const useUpdateBook = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: BookUpdatePayload) => {
        return axiosClient.put(`/book/update/${id}`, payload);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/book/detail"]);
        },

        onError: (error) => {
          toastError();
        },
      }
    );
    return { mutate, isLoading };
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
  const updateProfile = async (
    payload: ProfileUpdatePayload
  ): Promise<ProfileResponse> => {
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
    useCreateBulkBook
  };
};

export default useBookModule;
