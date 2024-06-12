// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import useAxiosAuth from "./useAxiousAuth";
// const useOptionBuku = () => {
//   const axiosAuthClient = useAxiosAuth();
//   const { data: session } = useSession();

//   const getBuku = async (): Promise<any> => {
//     return axiosAuthClient.get("/kategori/list").then((res) => res.data);
//   };

//   const { data: optionBuku, isFetching } = useQuery(
//     ["/kategori/list/options"],
//     () => getBuku(),
//     {
//       enabled: !!session === true,
//       select: (data) => {
//         console.log("data useoption", data);

//         const options = data?.data?.map((item: any) => {
//           return {
//             label: item.nama_kategori,
//             value: item.id,
//           };
//         });
//         return options;
//       },
//     }
//   );

//   return { optionBuku };
// };

// export default useOptionBuku;



