import { BaseResponsePagination } from "@/lib/axiousClient";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number | undefined | string;
  created_at: string;
  updated_at: string;
}
interface Form {
  nama: string | any;
  alamat: string | any;
}
interface Ujian {
  mapel: string | any;
  nilai: string | any;
}
interface Asli {
  nama: string | any;
  alamat: string | any;
  mapel: string | any;
  nilai: string | any;
  test1: string | any;
  test2: string | any;
}

interface Test {
  test1: string | any;
  test2: string | any;
}

export interface AsliPayload
  extends Pick<
    Asli,
    "nama" | "alamat" | "mapel" | "alamat" | "mapel" | "nilai"
  > {}

export interface FormPayload extends Pick<Form, "nama" | "alamat"> {}
export interface UjianPayload extends Pick<Ujian, "mapel" | "nilai"> {}
export interface TestPayload extends Pick<Test, "test1" | "test2"> {}

export interface BookListResponse extends BaseResponsePagination {
  data: Book[];
}

export interface BookListFilter extends Partial<Book> {
  from_year?: string;
  to_year?: string;
  page: number;
  pageSize: number;
}
export interface BookCreatePayload
  extends Pick<Book, "author" | "title" | "year"> {}

export interface BookCreateResponse {
  status: string;
  message: string;
  data?: Book;
}

export interface FormResponse extends FormPayload {}
export interface UjianResponse extends UjianPayload {}
export interface TestResponse extends TestPayload {}
export interface AsliResponse extends AsliPayload {}

export interface BookUpdatePayload extends BookCreatePayload {}

export interface BookUploadResponse extends BookCreateResponse {}

export interface BookDetailResponse extends Book {}

export interface BookCreateArrayPayload {
  data: BookCreatePayload[];
}

export interface BookDeleteArrayPayload {
  data: number[];
}
export interface FormArrayPayload {
  data: FormPayload[];
}
export interface UjianCreateArrayPayload {
  data: UjianPayload[];
}
export interface TestArrayPayload {
  data: TestPayload[];
}
export interface AsliArrayPayload {
  data: AsliPayload[];
}
