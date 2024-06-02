"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { Form, FormikProvider, useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import useBukuModule from "../lib";
import { BukuCreatePayload } from "../interface";

export const createBukuSchema = yup.object().shape({
  judul: yup.string().nullable().default("").required("Wajib isi"),
  penulis: yup.string().nullable().default("").required("Wajib isi"),
  penerbit: yup.string().nullable().default("").required("Wajib isi"),
  tahunTerbit: yup.number().nullable().default(undefined).required("Wajib pilih"),
});
export const option = [
  {
    value: 2020,
    label: "2020",
  },
  {
    value: 2021,
    label: "2021",
  },
  {
    value: 2022,
    label: "2022",
  },
  {
    value: 2023,
    label: "2023",
  },
];

const CreateBuku = () => {
  const { useCreateBuku } = useBukuModule();
  const { mutate, isLoading } = useCreateBuku();
  const formik = useFormik<BukuCreatePayload>({
    // initialValues: {
    //   title: "",
    //   author: "",
    //   year: undefined,
    // },
    initialValues: createBukuSchema.getDefault(),
    validationSchema: createBukuSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          setValues(createBukuSchema.getDefault());
        },
      });
      console.log("submit berjalan", values);
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

  return (
    <section className="flex items-center py-5 justify-center w-full h-full">
      <section className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-6">
          <Link href={"/buku"}>
            <span className="flex items-center border-black/40 border-2 rounded-lg w-max py-2 px-4 cursor-pointer">
              <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
              Kembali
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-center text-gray-500 py-8">
            Tambah Buku
          </h2>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} className="space-y-5">
              <section>
                <Label htmlFor="judul" title="Judul" />
                <InputText
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.judul}
                  placeholder="Judul Buku"
                  id="judul"
                  name="judul"
                  isError={!!errors.judul}
                  messageError={errors.judul}
                />
              </section>
              <section>
                <Label htmlFor="penulis" title="Penulis" />
                <InputText
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.penulis}
                  placeholder="Penulis Buku"
                  id="penulis"
                  name="penulis"
                  isError={!!errors.penulis}
                  messageError={errors.penulis}
                />
              </section>
              <section>
                <Label htmlFor="penerbit" title="Penerbit" />
                <InputText
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.penerbit}
                  placeholder="Penerbit Buku"
                  id="penerbit"
                  name="penerbit"
                  isError={!!errors.penerbit}
                  messageError={errors.penerbit}
                />
              </section>
              <section>
                <Label htmlFor="tahunTerbit" title="Tahun Terbit" />
                <Select
                  value={values.tahunTerbit}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="tahunTerbit"
                  name="tahunTerbit"
                  options={option}
                  isError={!!errors.tahunTerbit}
                  messageError={errors.tahunTerbit}
                />
              </section>
              <section className="flex justify-between">
                <Button
                  title="Simpan"
                  type="submit"
                  colorSchema="blue"
                  isDisabled={isLoading}
                />
                <Button
                  title="Batal"
                  type="button"
                  colorSchema="red"
                  onClick={() => resetForm()}
                />
              </section>
            </Form>
          </FormikProvider>
        </div>
      </section>
    </section>
  );
};

export default CreateBuku;
