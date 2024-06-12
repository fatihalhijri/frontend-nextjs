"use client";

import { BukuUpdatePayload } from "@/app/peminjam/interface";
import useBukuModule from "@/app/peminjam/lib";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { Form, FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { option } from "../../tambah/page";

const createBukuSchema = yup.object().shape({
  judul: yup.string().nullable().default("").required("Wajib isi"),
  penulis: yup.string().nullable().default("").required("Wajib isi"),
  penerbit: yup.string().nullable().default("").required("Wajib isi"),
  tahunTerbit: yup
    .number()
    .nullable()
    .default(undefined)
    .required("Wajib pilih"),
});

const UpdateBuku = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { useDetailBuku, useUpdateBuku } = useBukuModule();
  const { data, isFetching } = useDetailBuku(params.id);
  const { mutate, isLoading } = useUpdateBuku(+params.id);

  const formik = useFormik<BukuUpdatePayload>({
    initialValues: {
      judul: data?.judul || "",
      penulis: data?.penulis || "",
      penerbit: data?.penerbit || "",
      tahunTerbit: data?.tahunTerbit || "",
      // kategori_id:{
      //   id:data?.id,
      //   kategori:data?.tahunTerbit
      // }
      // id: data?.id,
    },
    validationSchema: createBukuSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("sumbit berjalan", values);
      mutate(values, {
        onSuccess: () => {
          // router.push("/admin");
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

  //   if (isFetching) {
  //     if (isFetching) {
  //       return (
  //         <p className="text-5xl text-center ">
  //           Loading................................
  //         </p>
  //       );
  //     }
  //   }
  return (
    <section className="flex items-center py-5 justify-center w-full h-full">
      <section className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-6">
          <Link href={"/admin"}>
            <span className="flex items-center   rounded-lg w-max py-2 px-4 cursor-pointer">
              <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
              Kembali
            </span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Perbarui Buku
          </h2>

          <FormikProvider value={formik}>
            <Form className="space-y-5" onSubmit={handleSubmit}>
              <section>
                <Label htmlFor="judul" title="judul" />
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
                <Label htmlFor="penerbit" title="penerbit" />
                <InputText
                  value={values.penerbit}
                  placeholder="penerbit Buku"
                  id="penerbit"
                  name="penerbit"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={!!errors.penerbit}
                  messageError={errors.penerbit}
                />
              </section>
              <section>
                <Label htmlFor="tahunTerbit" title="tahunTerbit" />
                <Select
                  value={values.tahunTerbit}
                  id="tahunTerbit"
                  name="tahunTerbit"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  options={option}
                  isError={!!errors.tahunTerbit}
                  messageError={errors.tahunTerbit}
                />
              </section>
              <section>
                <Button
                  height="md"
                  title="Perbarui"
                  colorSchema="blue"
                  // isLoading={isLoading}
                  isDisabled={isLoading}
                />
              </section>
            </Form>
          </FormikProvider>
        </div>
      </section>
    </section>
  );
};

export default UpdateBuku;
