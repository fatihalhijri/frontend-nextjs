import {
  BaseResponsePagination,
  BaseResponseSuccess,
} from "@/lib/axiousClient";

// interface User {
//   id?: number;
//   nama: string;
//   email: string;
//   password: string;
//   refresh_token: string;
//   access_token: string;
//   avatar: string;
//   role: string;
// }
interface User {
  id?: number;
  nama: string;
  username: string;
  password: string;
  refresh_token: string;
  access_token: string;
  cover: string;
}

// export interface RegisterPayload
//   extends Pick<User, "nama" | "email" | "password"> {}
export interface RegisterPayload
  extends Pick<User, "nama" | "username" | "password"> {}

export interface RegisterResponse extends BaseResponseSuccess {}

// export interface LoginPayload extends Pick<User, "email" | "password"> {}
export interface LoginPayload extends Pick<User, "username" | "password"> {}

export interface LoginResponse extends BaseResponseSuccess {
  data: User;
}

// export interface LupaPasswordPayload extends Pick<User, "email"> {}
export interface LupaPasswordPayload extends Pick<User, "username"> {}

export interface ResetPasswordPayload {
  new_password: string;
}

// export interface ProfileResponse extends BaseResponseSuccess {
//   data: User;
// }
export interface ProfileResponse extends BaseResponseSuccess {
  data: User;
}

// export interface ProfileUpdatePayload
//   extends Pick<User, "avatar" | "nama" | "id"> {
//   file?: File;
// }
export interface ProfileUpdatePayload
  extends Pick<User, "cover" | "nama" | "id"> {
  file?: File;
}
export interface BookPUpdatePayload
  extends Pick<User, "cover" | "nama" | "id" |"username"> {
  file?: File;
}
