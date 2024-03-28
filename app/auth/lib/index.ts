import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import {
  LoginPayload,
  LoginResponse,
  LupaPasswordPayload,
  ProfileResponse,
  ProfileUpdatePayload,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
} from "../interface";

import { BaseResponseSuccess, axiosClient } from "@/lib/axiousClient";
import { useToast } from "@/hook/useToast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import useAxiosAuth from "@/hook/useAxiousAuth";
import { useQueryClient } from "@tanstack/react-query";
import useUploadFile, { FileResponse } from "@/hook/useUploadFile";

const useAuthModule = () => {
  const { toastError, toastSuccess, toastWarning } = useToast();
  const axiosAuthClient = useAxiosAuth();
  const {uploadSingle} = useUploadFile();
  const { data: session } = useSession();
  const queryClient = useQueryClient()

  const router = useRouter();

  const register = async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    return axiosClient.post("/auth/register", payload).then((res) => res.data);
  };

  const useRegister = () => {
    const [errorValidation, setErrorValidation] = useState<string[]>([]);
    const handleTyping = (name: string) => {
      setErrorValidation((value) => {
        const filter = value.filter(
          (item: string) => item?.includes(name) === false
        );
        return filter;
      });
    };

    const handleShowError = (name: string) => {
      const message = errorValidation.find((item: string) =>
        item?.includes(name)
      );
      return message;
    };

    const { mutate, isLoading, isError, error } = useMutation({
      mutationFn: (payload: RegisterPayload) => register(payload),
      onSuccess: (response) => {
        toastSuccess(response.message);
        router.push("/auth/login");
      },
      // onMutate: () => {
      //   setErrorValidation([]);
      // },

      onError: (error: any) => {
        console.log("eerror", error);
        if (error.response.status === 302) {
          return toastWarning(error.response.data.message);
        }
        if (error.response.status === 400) {
          setErrorValidation(error.response.data.message);
          return toastWarning(error.response.data.message);
        }
        toastError();
      },
    });
    return { mutate, isLoading, isError, error, handleShowError, handleTyping };
  };

  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    
    return axiosClient.post("/auth/login", payload).then((res) => res.data);
  };

  const useLogin = () => {
    const [errorValidation, setErrorValidation] = useState<string[]>([]);
    const handleTyping = (name: string) => {
      setErrorValidation((value) => {
        const filter = value.filter(
          (item: string) => item?.includes(name) === false
        );
        return filter;
      });
    };

  const handleShowError = (name: string) => {
    const message = errorValidation.find((item: string) =>
      item?.includes(name)
    );
    return message;
  };
    const { mutate, isLoading ,isError,error} = useMutation(
      (payload: LoginPayload) => login(payload),
      
      {
        
        onSuccess: async (response) => {
          console.log("res", response);
          toastSuccess(response.message);
          await signIn("credentials", {
            id: response.data.id,
            name: response.data.nama,
            // role: response.data.role,
            email: response.data.username,
            refreshToken: response.data.refresh_token,
            accessToken: response.data.access_token,
            redirect: false,
          });

          // toastSuccess(response.message);

          // if (response.data.role === "admin") {
          //   return router.push("/admin");
          // }
          router.push("/book");
        },
        onError: (error: any) => {
          console.log("error", error);
          if (error.response.status === 302) {
            return toastWarning(error.response.data.message);
          }
          if (error.response.status === 400) {
            setErrorValidation(error.response.data.message);
            return toastWarning(error.response.data.message);
          }
          toastError();
        },
      }
    );
    return { mutate, isLoading ,handleShowError,handleTyping,isError,error};
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

  const getLupaPassword = async (
    payload: LupaPasswordPayload
  ): Promise<BaseResponseSuccess> => {
    return axiosClient
      .post("/auth/lupa-password", payload)
      .then((res) => res.data);
  };
  const useLupaPassword = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LupaPasswordPayload) => getLupaPassword(payload),
      {
        onSuccess(res) {
          toastSuccess(res.message);
          router.push("/login");
        },
        onError: (error: any) => {
          if (error.resposne.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading };
  };

  const resetPassword = async (
    payload: ResetPasswordPayload,
    id: string,
    token: string
  ): Promise<BaseResponseSuccess> => {
    return axiosClient
      .post(`/auth/reset-password/${id}/${token}`, payload)
      .then((res) => res.data);
  };

  const useResetPassword = (id: string, token: string) => {
    const { mutate, isLoading } = useMutation(
      (payload: ResetPasswordPayload) => resetPassword(payload, id, token),
      {
        onSuccess: (res) => {
          toastSuccess(res.message);
          router.push("/login");
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
  // const uploadSingle = async (file: any): Promise<FileResponse> => {
  //   const form = new FormData();
  //   form.append("file", file);

  //   return axiosAuthClient
  //     .post("/upload/file", form, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => res.data);
  // };

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
      .put("/profile/update", payload)
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
    useRegister,
    useLogin,
    useProfile,
    useLupaPassword,
    useResetPassword,
    useUpdateProfile
  };
};

export default useAuthModule;
