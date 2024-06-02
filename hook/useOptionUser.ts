import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxiosAuth from "./useAxiousAuth";
const useOptionUser = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();

  const getUser = async (): Promise<any> => {
    return axiosAuthClient.get("/user/list").then((res) => res.data);
  };

  const { data: optionUser, isFetching } = useQuery(
    ["/user/list/options"],
    () => getUser(),
    {
      enabled: !!session === true,
      select: (data) => {
        console.log("data useoption", data);

        const options = data?.data?.map((item: any) => {
          return {
            label: item.nama,
            value: item.id,
          };
        });
        return options;
      },
    }
  );

  return { optionUser };
};

export default useOptionUser;



