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

const createBookSchema = yup.object().shape({
  title: yup.string().nullable().default("").required("Wajib isi"),
  author: yup.string().nullable().default("").required("Wajib isi"),
  year: yup.number().nullable().default(undefined).required("Wajib pilih"),
});

const UpdateBook = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { useDetailBook, useUpdateBook } = useBookModule();
  const { data, isFetching } = useDetailBook(params.id);
  const { mutate, isLoading } = useUpdateBook(+params.id);

  const formik = useFormik<BookUpdatePayload>({
    initialValues: {
      title: data?.title || "",
      year: data?.year || "",
      author: data?.author || "",
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
              <Label htmlFor="title" title="Title" />
              <InputText
                value={values.title}
                placeholder="Judul Buku"
                id="title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.title}
                messageError={errors.title}
              />
            </section>
            <section>
              <Label htmlFor="author" title="Auhtor" />
              <InputText
                value={values.author}
                placeholder="Penulis Buku"
                id="author"
                name="author"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.author}
                messageError={errors.author}
              />
            </section>
            <section>
              <Label htmlFor="year" title="Year" />
              <Select
                value={values.year}
                id="year"
                name="year"
                onChange={handleChange}
                onBlur={handleBlur}
                options={option}
                isError={!!errors.year}
                messageError={errors.year}
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
