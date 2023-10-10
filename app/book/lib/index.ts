import { useQuery } from "@tanstack/react-query";
import { BookListResponse } from "../interface";
import { axiosClient } from "@/lib/axiousClient";

const useBookModule = () => {
  const getBookList = async (): Promise<BookListResponse> => {
    return axiosClient.get("/book/list").then((res) => res.data);
  };
  const useBookList = () => {
    const { data, isFetching, isLoading } = useQuery(
      ["/book/list"],
      () => getBookList(),
      {
        keepPreviousData: true,

        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  return { useBookList };
};

export default useBookModule;
