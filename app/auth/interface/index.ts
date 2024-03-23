import {
  BaseResponsePagination,
  BaseResponseSuccess,
} from "@/lib/axiousClient";

interface User {
  id?: number;
  nama: string;
  email: string;
  password: string;
  refresh_token: string;
  access_token: string;
  avatar: string;
  role: string;
}

export interface RegisterPayload
  extends Pick<User, "nama" | "email" | "password"> {}

export interface RegisterResponse extends BaseResponseSuccess {}

export interface LoginPayload extends Pick<User, "email" | "password"> {}

export interface LoginResponse extends BaseResponseSuccess {
  data: User;
}

export interface LupaPasswordPayload extends Pick<User, "email"> {}

export interface ResetPasswordPayload {
  new_password: string;
}

// export interface ProfileResponse extends BaseResponseSuccess {
  //   data: User;
  // }
  export interface ProfileResponse extends BaseResponseSuccess {
    data: User;
  }

export interface ProfileUpdatePayload
  extends Pick<User, "avatar" | "nama" | "id"> {
  file?: File;
}
