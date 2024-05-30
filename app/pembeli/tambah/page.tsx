"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import useBookModule from "../lib";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useProdukModule from "../lib";
import useOptions from "@/hook/useOption";
import { id } from "date-fns/locale";

export const createBookSchema = yup.object().shape({
  nama_produk: yup.string().nullable().default("").required("Wajib isi"),
  barcode: yup.string().nullable().default("").required("Wajib isi"),
  harga: yup.number().default(0).required("Wajib di sisi"),
  stok: yup.number().nullable().default(0).required("Wajib pilih"),
  cover: yup.string().nullable().default("").required("Wajib di sisi"),
  deskripsi_produk: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib di isi"),
  kategori_id: yup
    .number()
    .nullable()
    .default(undefined)
    .required("Wajib pilih"),
});
// export const option = [
//   {
//     value: 2020,
//     label: "2020",
//   },
//   {
//     value: 2021,
//     label: "2021",
//   },
//   {
//     value: 2022,
//     label: "2022",
//   },
//   {
//     value: 2023,
//     label: "2023",
//   },
// ];

const { optionKategori } = useOptions();
console.log(" option Kategori", optionKategori);

const CreateProduk = () => {
  const router = useRouter();
  const { useCreateProduk } = useProdukModule();
  const { mutate, isLoading } = useCreateProduk();

  const formik = useFormik<ProdukCreateDto>({
    initialValues: createProdukSchema.getDefault(),
    validationSchema: createProdukSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("values", values);
      mutate(values, {
        onSuccess: () => {
          resetForm();
          // setValues(createProdukSchema.getDefault());
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

  return (
    <section className="flex items-center py-32 justify-center w-full h-full">
      <section className=" w-1/2">
        <Link href={"/ujian"}>
          <span className="flex items-center border-black/40 border-2 rounded-lg w-max py-2 px-4">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-5xl font-bold text-center text-gray-500 py-8">
          Tambah Buku
        </h2>
        value:{JSON.stringify(values)}
        error:{JSON.stringify(errors)}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="judul" title="Judul" />
              <InputText
                onChange={(e) => {
                  setFieldValue("judul", e.target.value);
                  if (e.target.value === "ihsan") {
                    setFieldValue("year", 2023);
                  }
                  if (e.target.value === "fatih") {
                    setFieldValue("year", 2023);
                  }
                }}
                onBlur={handleBlur}
                value={values.judul}
                placeholder="Judul Buku"
                id="judul"
                name="judul"
                isError={!!errors.judul}
                // messageError={errors.judul}
              />
            </section>
            <section>
              <Label htmlFor="penulis" title="penulis" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.penulis}
                placeholder="Penulis Buku"
                id="penulis"
                name="penulis"
                isError={!!errors.penulis}
                // messageError={errors.penulis}
              />
            </section>
            <section>
              <Label htmlFor="harga" title="harga" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.harga}
                placeholder="harga Buku"
                id="harga"
                name="harga"
                isError={!!errors.harga}
                // messageError={errors.harga}
              />
            </section>
            <section className="">
              <div>
                <img
                  src={values.cover || "/img/profile2.jpg"}
                  width={100}
                  height={100}
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
              {errors.cover && <p className="text-red-500">{errors.cover}</p>}
            </section>
            <section>
              <Label htmlFor="deskripsi" title="deskripsi" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.deskripsi}
                placeholder="deskripsi Buku"
                id="deskripsi"
                name="deskripsi"
                isError={!!errors.deskripsi}
                // messageError={errors.deskripsi}
              />
            </section>
            <section>
              <Label htmlFor="kategori_id" title="Kategori" />
              <Select
                value={values.kategori_id || 0}
                id={optionKategori}
                name={"kategori_id"}
                onChange={handleChange}
                onBlur={handleBlur}
                options={optionKategori}
                isError={
                  getIn(errors?.data?.[index], "kategori_id") &&
                  getIn(touched?.data?.[index], "kategori_id")
                }
                messageError={getIn(errors?.data?.[index], "kategori_id")}
              />
            </section>
            <section>
              <Button
                height="lg"
                title="Simpan"
                type="submit"
                colorSchema="blue"
                onClick={() => {
                  router.push("/ujian");
                }}
              />
              <Button
                height="lg"
                title="Cancel"
                type="button"
                onClick={() => {
                  resetForm();
                }}
                colorSchema="red"
              />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default CreateBook;
