"use client";

import Button from "@/components/Button";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { option } from "../../module/filter";
import Select from "@/components/Select";
import Label from "@/components/Label";
import InputText from "@/components/InputText";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import * as yup from "yup";
import useBookModule from "../../lib";
import { BookCreatePayload, BookUpdatePayload } from "../../interface";
import { useRouter } from "next/navigation";
import { createBookSchema } from "../../tambah/page";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

// const createBookSchema = yup.object().shape({
//   title: yup.string().nullable().default("").required("Wajib isi"),
//   author: yup.string().nullable().default("").required("Wajib isi"),
//   year: yup.number().nullable().default(undefined).required("Wajib pilih"),
// });

const UpdateBook = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const queryClient = useQueryClient()
  const { useDetailBook, useUpdateBook } = useBookModule();
  const { data, isFetching } = useDetailBook(params.id);
  const { mutate, isLoading } = useUpdateBook(+params.id);

  const formik = useFormik<BookUpdatePayload>({
    initialValues: {
      judul: data?.judul || "",
      penulis: data?.penulis || "",
      tahun_terbit: data?.tahun_terbit || "",
      harga: data?.harga || 0,
      deskripsi: data?.deskripsi || "",
      cover: data?.cover || "",
      // id: data?.id,
    },
    validationSchema: createBookSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("sumbit berjalan", values);
      mutate(values, {
        onSuccess: () => {
          router.push("/book");
          console.log("sudah selesai");
        },
      });
    },
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;

  if (isFetching) {
    if (isFetching) {
      return (
        <p className="text-5xl text-center ">
          Loading................................
        </p>
      );
    }
  }
  return (
    <section className="flex items-center  justify-center w-full h-full">
      <section className="w-1/2">
        <Link href={"/book"}>
          <span className="flex items-center">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-5xl font-bold text-center text-gray-500 py-8">
          Perbaharui Buku
        </h2>

        <FormikProvider value={formik}>
          <Form className="space-y-5" onSubmit={handleSubmit}>
            <section>
              <Label htmlFor="judul" title="Judul" />
              <InputText
                value={values.judul}
                placeholder="Judul Buku"
                id="judul"
                name="judul"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.judul}
                messageError={errors.judul}
              />
            </section>
            <section>
              <Label htmlFor="penulis" title="penulis" />
              <InputText
                value={values.penulis}
                placeholder="Penulis Buku"
                id="penulis"
                name="penulis"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.penulis}
                messageError={errors.penulis}
              />
            </section>
            <section>
              <Label htmlFor="harga" title="harga" />
              <InputText
                value={values.harga}
                placeholder="harga Buku"
                id="harga"
                name="harga"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.harga}
                messageError={errors.harga}
              />
            </section>
            <section className="">
              <div>
                <Image
                  src={values.cover || "/img/profile2.jpg"}
                  width={70}
                  height={70}
                  alt="foto orang"
                />
              </div>
              <input
                type="file"
                id="file"
                onChange={(event: any) => {
                  const file = event.target.files[0];
                  console.log("file", file);

                  // if (file.type !== "image/jpeg") {
                  //   return alert("type tidak sesauai");
                  // }

                  let reader = new FileReader();
                  reader.onloadend = () => {
                    setFieldValue(`cover`, reader.result);
                  };
                  reader.readAsDataURL(file);
                  setFieldValue("file", file);
                }}
              />
            </section>
            <section>
              <Label htmlFor="deskripsi" title="deskripsi" />
              <InputText
                value={values.deskripsi}
                placeholder="deskripsi Buku"
                id="deskripsi"
                name="deskripsi"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.deskripsi}
                messageError={errors.deskripsi}
              />
            </section>
            <section>
              <Label htmlFor="tahun_terbit" title="tahun_terbit" />
              <Select
                value={values.tahun_terbit}
                id="tahun_terbit"
                name="tahun_terbit"
                onChange={handleChange}
                onBlur={handleBlur}
                options={option}
                isError={!!errors.tahun_terbit}
                messageError={errors.tahun_terbit}
              />
            </section>
            <section>
              <Button
                height="md"
                title="Perbarui"
                colorSchema="blue"
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default UpdateBook;
