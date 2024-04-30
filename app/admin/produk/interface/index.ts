import { BaseResponsePagination } from "@/lib/axiousClient";

interface Produk {
  id?: number;
  nama_produk: string;
  deskripsi_produk:string;
  harga: number | undefined | string;
  stok:string;
  created_at: string;
  updated_at: string;
  kategori_id:number;
  barcode:number; 
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