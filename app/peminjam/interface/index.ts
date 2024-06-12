import { BaseResponsePagination } from "@/lib/axiousClient";

interface Buku {
  id: number;
  judul: string;
  penulis: string;
  penerbit: string;
  tahunTerbit: number | undefined | string;
  user_id: {
    id: number;
    user: string;
  };
  buku: {
    id: number;
    judul: string;
  };
  kategori:{
    id:number,
    nama_kategori:string
  }
  ulasan: string;
  rating: number;

  // kategori_id:{
  //   id:number,
  //   kategori:string
  // }
}
interface Kategori {
  id: number;
  nama_kategori: string;
}

export interface KategoriResponse extends BaseResponsePagination {
  data: Kategori[];
}
interface KategoriRelasi {
  id: number;
  kategori: Kategori;
  buku: Buku;
}
export interface BukuResponse extends BaseResponsePagination {
  data: KategoriRelasi[];
}

export interface BukuListResponse extends BaseResponsePagination {
  data: Buku[];
}
export interface KategoriRelasiResponse extends BaseResponsePagination {
  data: Buku[];
}
// export interface BukuDetailResponse extends BaseResponsePagination {
//   data: Buku[];
// }

export interface BukuListFilter extends Partial<Buku> {
  // kategori_id:number;
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
  extends Pick<Buku, "ulasan" | "rating"> {
  // user_id:number
  buku_id: number;
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
