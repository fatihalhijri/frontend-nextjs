import { BaseResponsePagination } from "@/lib/axiousClient";

interface Produk {
  id: number;
  title: string;
  author: string;
  year: number | undefined | string;
  created_at: string;
  updated_at: string;
}



export interface ProdukListResponse extends BaseResponsePagination {
  data: Produk[];
}

export interface ProdukListFilter extends Partial<Produk> {
  from_year?: string;
  to_year?: string;
  page: number;
  pageSize: number;
}
export interface ProdukCreatePayload
  extends Pick<Produk, "author" | "title" | "year"> {}

export interface ProdukCreateResponse {
  status: string;
  message: string;
  data?: Produk;
}


export interface ProdukUpdatePayload extends ProdukCreatePayload {}

export interface ProdukUploadResponse extends ProdukCreateResponse {}

export interface ProdukDetailResponse extends Produk {}

export interface ProdukCreateArrayPayload {
  data: ProdukCreatePayload[];
}

export interface ProdukDeleteArrayPayload {
  data: number[];
}

