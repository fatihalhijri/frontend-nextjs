import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { ProdukCreateArrayPayload } from "../interface";

export const createBookSchema = yup.object().shape({
  barcode: yup.string().nullable().default("").required("Wajib isi"),
  nama_produk: yup.string().nullable().default("").required("Wajib isi"),
  deskripsi_produk: yup
    .string()
    .nullable()
    .default(undefined)
    .required("Wajib pilih"),
  harga: yup.number().nullable().default(undefined).required("Wajib pilih"),
  stok: yup.number().nullable().default(undefined).required("Wajib pilih"),
  kategori_id: yup
    .number()
    .nullable()
    .default(undefined)
    .required("Wajib pilih"),
});

const defaultProdukArray = {
  data: [
    {
      barcode: "",
      nama_produk: "",
      deskripsi_produk: "",
      harga: null,
      stok: null,
      kategori_id: null,
    },
  ],
};
const createBookArraySchema = yup
  .object()
  .shape({ data: yup.array().of(createBookSchema) })
  .default(defaultProdukArray);
export const TambahProduk = () => {
  const formik = useFormik<ProdukCreateArrayPayload>({
    initialValues: defaultProdukArray,
    validationSchema: createBookArraySchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  return <div>TambahProduct</div>;
};

// export default function TambahProduk() {}
