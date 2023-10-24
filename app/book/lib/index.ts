import { useQuery } from "@tanstack/react-query";
import { BookListFilter, BookListResponse } from "../interface";
import { axiosClient } from "@/lib/axiousClient";
import { ChangeEvent, useState } from "react";

const useBookModule = () => {
  const defaultParams = {
    page: 1,
    pageSize: 10,
    title: "",
    author: "",
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
    let [params, setParams] = useState<BookListFilter>(defaultParams);
    let [filterParams, setFilterParams] =
      useState<BookListFilter>(defaultParams);

      
    const handleFilter = () => {
      setFilterParams(()=>{
        return {
          ...params,
          page:1
        };
      });
      setParams((prevParams)=>{
        return{
          ...prevParams,
          page:1
        }
      })
    };


    const handleClear = () => {
      setFilterParams(defaultParams);
      setParams(defaultParams);
    };

    const handlePageSize = (e: ChangeEvent<any>) => {
      console.log("event", e.target.value);
      setParams((params) => ({ ...params, pageSize: e.target.value, page: 1 }));
      setFilterParams((params) => ({
        ...params,
        pageSize: e.target.value,
        page: 1,
      }));
    };

    const handlePage = (page: number) => {
      setParams((params) => ({ ...params, page: page }));
      setFilterParams((params) => ({ ...params, page: page }));
    };
    const { data, isFetching, isLoading } = useQuery(
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

  return { useBookList };
};

export default useBookModule;
