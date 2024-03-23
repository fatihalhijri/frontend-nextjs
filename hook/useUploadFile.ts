import { BaseResponseSuccess } from "@/lib/axiousClient";
import useAxiosAuth from "./useAxiousAuth";


export interface FileResponse extends BaseResponseSuccess {
  data: {
    file_url: string;
    file_name: string;
    file_size: number;
  };
}
const useUploadFile = () => {
  const axiosAuthClient = useAxiosAuth();

   const uploadSingle = async (file: any): Promise<FileResponse> => {
    const form = new FormData();
    form.append("file", file);

    return axiosAuthClient
      .post("/upload/file", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };

  const deleteFile = async (file_name: string) => {
    return axiosAuthClient.delete(`upload/file/delete/${file_name}`);
  };

  return { uploadSingle, deleteFile };
};

export default useUploadFile;