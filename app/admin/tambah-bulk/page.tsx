"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import {
  useFormik,
  Form,
  FormikProvider,
  FieldArray,
  ArrayHelpers,
  getIn,
} from "formik";
import * as yup from "yup";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { AddButton, DeleteButton } from "@/components/ButtonAction";
import { option } from "../tambah/page";
import useBukuModule from "@/app/peminjam/lib";
import { BukuCreateArrayPayload } from "@/app/peminjam/interface";

export const createBukuSchema = yup.object().shape({
  judul: yup.string().nullable().default("").required("Wajib isi"),
  penulis: yup.string().nullable().default("").required("Wajib isi"),
  penerbit: yup.string().nullable().default("").required("Wajib isi"),
  tahunTerbit: yup
    .number()
    .nullable()
    .default(undefined)
    .required("Wajib pilih"),
});
const defaultCatatanArray = {
  data: [
    {
      judul: "",
      penulis: "",
      penerbit: "",
      tahunTerbit: undefined,
    },
  ],
};

const createBukuArraySchema = yup
  .object()
  .shape({
    data: yup.array().of(createBukuSchema),
  })
  .default(defaultCatatanArray);

// const ujianSchema = yup.object().shape({
//   nilai: yup.string().nullable().required(""),
//   mapel: yup.string().nullable().required(""),
// });

// const createUser = yup.object().shape({
//   nama: yup
//     .string()
//     .nullable()
//     .required("Nama Wajib Diisi")
//     .matches(/^[a-zA-Z]+$/, "This field must contain only letters."),
//   alamat: yup.string().nullable().required(),
//   ujian: yup.array().of(ujianSchema),
//   test: yup.object().shape({
//     test1: yup.string().nullable().required(),
//     test2: yup.string().nullable().required(),
//   }),
// });

const CreateBuku = () => {
  const { useCreateBulkBuku } = useBukuModule();
  const { mutate, isLoading } = useCreateBulkBuku();
  const onSubmit = async (values: BukuCreateArrayPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(defaultCatatanArray);
      },
    });
  };

  const formik = useFormik<BukuCreateArrayPayload>({
    initialValues: createBukuArraySchema.getDefault(),
    validationSchema: createBukuArraySchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
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
    touched,
  } = formik;

  return (
    <section className="flex items-center  justify-center w-full h-full ">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-6">
          
        <Link href={"/admin"}>
            <span className="flex items-center   rounded-lg w-max py-2 px-4 cursor-pointer">
              <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
              Kembali
            </span>
          </Link>
          <h2 className="mt-6 text-center md:text-xl text-base font-extrabold text-gray-900">
            Tambah Banyak Buku
          </h2>
            {/* {JSON.stringify(errors)} */}
            <FormikProvider value={formik}>
              <Form className="space-y-5" onSubmit={handleSubmit}>
                <FieldArray
                  name={"data"}
                  render={(arrayHelpers: ArrayHelpers) => (
                    <>
                      {values &&
                        values?.data?.map((value, index) => (
                          <section
                            key={index}
                            className="space-y-2 shadow-lg p-5 relative"
                          >
                            <section className="flex items-center justify-end">
                              <DeleteButton
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            </section>
                            <section>
                              <Label htmlFor="Judul" title="Judul" />
                              <InputText
                                value={value.judul}
                                placeholder="Judul Buku"
                                id={`data[${index}]judul`}
                                name={`data[${index}]judul`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isError={getIn(errors?.data?.[index], "judul")}
                                messageError={getIn(
                                  errors?.data?.[index],
                                  "judul"
                                )}
                              />
                            </section>
                            <section>
                              <Label htmlFor="penulis" title="Penulis" />
                              <InputText
                                value={value.penulis}
                                placeholder="Penulis Buku"
                                id={`data[${index}]penulis`}
                                name={`data[${index}]penulis`}
                                onChange={(e) => {
                                  setFieldValue(
                                    `data[${index}]penulis`,
                                    e.target.value
                                  );
                                }}
                                onBlur={handleBlur}
                                isError={getIn(
                                  errors?.data?.[index],
                                  "penulis"
                                )}
                                messageError={getIn(
                                  errors?.data?.[index],
                                  "penulis"
                                )}
                              />
                            </section>
                            <section>
                              <Label htmlFor="penerbit" title="Penerbit" />
                              <InputText
                                value={value.penerbit}
                                placeholder="penerbit Buku"
                                id={`data[${index}]penerbit`}
                                name={`data[${index}]penerbit`}
                                onChange={(e) => {
                                  setFieldValue(
                                    `data[${index}]penerbit`,
                                    e.target.value
                                  );
                                }}
                                onBlur={handleBlur}
                                isError={getIn(
                                  errors?.data?.[index],
                                  "penerbit"
                                )}
                                messageError={getIn(
                                  errors?.data?.[index],
                                  "penerbit"
                                )}
                              />
                            </section>
                            <section>
                              <Label
                                htmlFor="tahunTerbit"
                                title="tahunTerbit"
                              />
                              <Select
                                value={value.tahunTerbit}
                                id={`data[${index}]tahunTerbit`}
                                name={`data[${index}]tahunTerbit`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                options={option}
                                isError={getIn(
                                  errors?.data?.[index],
                                  "tahunTerbit"
                                )}
                                messageError={getIn(
                                  errors?.data?.[index],
                                  "tahunTerbit"
                                )}
                              />
                            </section>
                          </section>
                        ))}

                      <section>
                        <AddButton
                          onClick={() =>
                            arrayHelpers.push(createBukuSchema.getDefault())
                          }
                        />
                      </section>
                    </>
                  )}
                />

                <section>
                  <Button
                    height="md"
                    title="Simpan"
                    colorSchema="blue"
                    // isLoading={isLoading}
                    isDisabled={isLoading}
                  />
                </section>
              </Form>
            </FormikProvider>
         
        </div>
      </div>
    </section>
  );
};

export default CreateBuku;
