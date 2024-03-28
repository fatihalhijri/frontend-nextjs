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
import { BookCreateArrayPayload } from "../interface";
import useBookModule from "../lib";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { AddButton, DeleteButton } from "@/components/ButtonAction";
import { createBookSchema } from "../tambah/page";
import { option } from "../tambah/page";

const defaultCatatanArray = {
  data: [
    {
      judul: "",
      penulis: "",
      tahun_terbit: undefined,
      harga: 0,
      cover:"",
      deskripsi:""
      
    },
  ],
};

const createBookArraySchema = yup
  .object()
  .shape({
    data: yup.array().of(createBookSchema),
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

const CreateBook = () => {
  const { useCreateBulkBook } = useBookModule();
  const { mutate, isLoading } = useCreateBulkBook();
  const onSubmit = async (values: BookCreateArrayPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(defaultCatatanArray);
      },
    });
  };

  const formik = useFormik<BookCreateArrayPayload>({
    initialValues: createBookArraySchema.getDefault(),
    validationSchema: createBookArraySchema,
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
    <section className="flex items-center  justify-center w-full h-full overflow-auto py-10">
      <section className="w-1/2">
        <Link href={"/book"}>
          <span className="flex items-center">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-xl font-bold text-gray-500">Tambah Buku</h2>
        {JSON.stringify(errors)}
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
                          <Label
                            htmlFor={`data[${index}]judul`}
                            title="Judul"
                          />
                          <InputText
                            value={value.judul}
                            placeholder="Judul Buku"
                            id={`data[${index}]judul`}
                            name={`data[${index}]judul`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isError={
                              getIn(errors?.data?.[index], "judul") &&
                              getIn(touched?.data?.[index], "judul")
                            }
                            messageError={
                              getIn(errors?.data?.[index], "judul") &&
                              getIn(touched?.data?.[index], "judul")
                            }
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
                            isError={getIn(errors?.data?.[index], "penulis")}
                            messageError={getIn(
                              errors?.data?.[index],
                              "penulis"
                            )}
                          />
                        </section>
                        <section>
                          <Label htmlFor="harga" title="harga" />
                          <InputText
                            value={value.harga}
                            placeholder="harga Buku"
                            id={`data[${index}]harga`}
                            name={`data[${index}]harga`}
                            onChange={(e) => {
                              setFieldValue(
                                `data[${index}]harga`,
                                e.target.value
                              );
                            }}
                            onBlur={handleBlur}
                            isError={getIn(errors?.data?.[index], "penulis")}
                            messageError={getIn(
                              errors?.data?.[index],
                              "penulis"
                            )}
                          />
                        </section>
                        <section>
                          <Label htmlFor="cover" title="cover" />
                          <InputText
                            value={value.cover}
                            placeholder="cover Buku"
                            id={`data[${index}]cover`}
                            name={`data[${index}]cover`}
                            onChange={(e) => {
                              setFieldValue(
                                `data[${index}]cover`,
                                e.target.value
                              );
                            }}
                            onBlur={handleBlur}
                            isError={getIn(errors?.data?.[index], "cover")}
                            messageError={getIn(
                              errors?.data?.[index],
                              "cover"
                            )}
                          />
                        </section>
                        <section>
                          <Label htmlFor="deskripsi" title="deskripsi" />
                          <InputText
                            value={value.deskripsi}
                            placeholder="deskripsi Buku"
                            id={`data[${index}]deskripsi`}
                            name={`data[${index}]deskripsi`}
                            onChange={(e) => {
                              setFieldValue(
                                `data[${index}]deskripsi`,
                                e.target.value
                              );
                            }}
                            onBlur={handleBlur}
                            isError={getIn(errors?.data?.[index], "deskripsi")}
                            messageError={getIn(
                              errors?.data?.[index],
                              "deskripsi"
                            )}
                          />
                        </section>
                        <section>
                          <Label htmlFor="tahun_terbit" title="tahun_terbit" />
                          <Select
                            value={value.tahun_terbit}
                            id={`data[${index}]tahun_terbit`}
                            name={`data[${index}]tahun_terbit`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={option}
                            isError={getIn(errors?.data?.[index], "tahun_terbit")}
                            messageError={getIn(errors?.data?.[index], "tahun_terbit")}
                          />
                        </section>
                      </section>
                    ))}

                  <section>
                    <AddButton
                      onClick={() =>
                        arrayHelpers.push(createBookSchema.getDefault())
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
      </section>
    </section>
  );
};

export default CreateBook;
