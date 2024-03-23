import { BaseResponsePagination } from "@/lib/axiousClient";

interface Produk {
  id?: number;
  nama_produk: string;
  deskripsi:string;
  harga: number | undefined | string;
  created_at: string;
  updated_at: string;
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