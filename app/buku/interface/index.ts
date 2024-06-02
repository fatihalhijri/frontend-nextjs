import { BaseResponsePagination } from "@/lib/axiousClient";

interface Buku {
  id: number;
  judul: string;
  penulis: string;
  penerbit: string;
  tahunTerbit: number | undefined | string;
  user_id:{
    id:number;
    user:string
  }
  buku_id:{
    id:number;
    buku:string
  }
  ulasan:string;
  rating:number

  // kategori_id:{
  //   id:number,
  //   kategori:string
  // }
}

export interface BukuListResponse extends BaseResponsePagination {
  data: Buku[];
}
// export interface BukuDetailResponse extends BaseResponsePagination {
//   data: Buku[];
// }

export interface BukuListFilter extends Partial<Buku> {
  dari_tahun?: string;
  ke_tahun?: string;
  page: number;
  pageSize: number;
}
export interface BukuCreatePayload
  extends Pick<Buku, "judul" | "penulis" | "penerbit" | "tahunTerbit"> {
  // kategori_id:number
}
export interface BukuUlasanCreatePayload
  extends Pick<Buku, "ulasan" | "rating" > {
  // user_id:number
  buku_id:number
}
// export interface BukuUlasanCreate extends <Buku,> {
  
// }

export interface BukuCreateResponse {
  status: string;
  message: string;
  data?: Buku;
}

export interface BukuUpdatePayload extends BukuCreatePayload {}

export interface BukuUploadResponse extends BukuCreateResponse {}

export interface BukuDetailResponse extends Buku {}

export interface BukuCreateArrayPayload {
  data: BukuCreatePayload[];
}

export interface BukuDeleteArrayPayload {
  data: number[];
}
