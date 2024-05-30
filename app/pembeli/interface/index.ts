import { BaseResponsePagination } from "@/lib/axiousClient";

interface Produk {
  id?: number;
  nama_produk: string;
  deskripsi_produk: string;
  kategori_id:{
    id:number
    kategori:string;
  };
  harga:number;
  barcode:string;
  stok:number;
  cover:string;
  created_at: string;
  updated_at: string;
}



export interface ProdukListResponse extends BaseResponsePagination {
  data: Produk[];
}

export interface ProdukListFilter extends Partial<Produk> {
  barcode?: string;
  kategori_id?: string |any;
  page: number;
  pageSize: number;
}
export interface ProdukCreatePayload
  extends Pick<Produk, "deskripsi_produk" | "nama_produk" | "kategori_id"|'harga'|'barcode'|'stok'> {}

export interface ProdukCreateResponse {
  status: string;
  message: string;
  data?: Produk;
}
export interface ProdukCreateDto extends Omit<Produk, " id"> {
  file?: File;
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

