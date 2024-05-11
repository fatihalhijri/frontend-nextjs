import { BaseResponsePagination } from "@/lib/axiousClient";

interface Produk {
  id?: number;
  nama_produk: string;
  deskripsi_produk:string;
  // harga: number | undefined | string;
  harga: number |null;
  barcode:string; 
  stok:number |null;
  // created_at: string;
  // updated_at: string;
  created_by:{
    id:number;
    nama:string;
  };
  updated_by:{
    id:number;
    nama:string;
  };
  kategori_id:{
    id:number
  };
}

export interface ProdukListResponse extends BaseResponsePagination{
    data:Produk[]
}
export interface ProdukListFilter extends Partial<Produk> {
    dari_tahun?:string;
    akhir_tahun?:string;
    page:number;
    pageSize:number;
}

export interface ProdukCreatePayload
  extends Pick<
    Produk,
    "harga" | "barcode" | "nama_produk" | "deskripsi_produk" | "stok" 
  > {
  kategori_id: number;
}

export interface ProdukCreateArrayPayload {
  data: ProdukCreatePayload[];
}