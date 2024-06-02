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
import {
  BookCreateArrayPayload,
  FormArrayPayload,
  TestArrayPayload,
  UjianCreateArrayPayload,
} from "../interface";
import useBookModule from "../lib";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { AddButton, DeleteButton } from "@/components/ButtonAction";
import { createBookSchema } from "../tambah/page";
import { option } from "../tambah/page";

const form = {
  data: [
    {
      nama: "",
      alamat: "",
    },
  ],
};
const test = {
  data: [
    {
      test1: "",
      test2: "",
    },
  ],
};

const defaultCatatanArray = {
  data: [
    {
      mapel: "",
      nilai: "",

      // year: undefined,
    },
  ],
};

const ujianSchemaForm = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .matches(/^[a-zA-Z]+$/, "Harus pake huruf")
    .required("wajib di isi"),
  alamat: yup.string().nullable().required("wajib di isi"),
});

const createUjianArraySchemaForm = yup
  .object()
  .shape({
    data: yup.array().of(ujianSchemaForm),
  })
  .default(form);

const ujianSchema = yup.object().shape({
  mapel: yup
    .string()
    .nullable()
    .matches(/^[a-zA-Z]+$/, "Harus pake huruf")
    .required("wajib di isi"),
  nilai: yup.string().nullable().required("wajib di isi"),
});

const createUjianArraySchema = yup
  .object()
  .shape({
    data: yup.array().of(ujianSchema),
  })
  .default(defaultCatatanArray);

const ujianSchemaTest = yup.object().shape({
  test1: yup
    .string()
    .nullable()
    .matches(/^[a-zA-Z]+$/, "Harus pake huruf")
    .required("wajib di isi"),
  test2: yup.string().nullable().required("wajib di isi"),
});
const createUjianArraySchemaTest = yup
  .object()
  .shape({
    data: yup.array().of(ujianSchemaTest),
  })
  .default(test);

// const createUser = yup.object().shape({
//   nama: yup
//     .string()
//     .nullable()
//     .required("Nama Wajib Diisi")
//     .matches(/^[a-zA-Z]+$/, "This field must contain only letters."),
//   alamat: yup.string().nullable().required(),
//   ujian: yup.array().of(ujianSchema),
//   test: yup.object().shape({
//     test1: yup.string().nullable().required("isi"),
//     test2: yup.string().nullable().required("isi"),
//   }),
// });

const CreateBook = () => {
  const { useCreateBulkUjian, useCreateBulkForm } = useBookModule();
  const { mutate, isLoading } = useCreateBulkUjian();
  const onSubmit = async (values: UjianCreateArrayPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        // setValues(defaultCatatanArray );
      },
      onError: () => {
        resetForm();
      },
    });
  };
  // const onSubmitForm = async (values: FormArrayPayload) => {
  //   mutate(values, {
  //     onSuccess: () => {
  //       resetForm();
  //       setValues(form);
  //     },
  //     onError: () => {
  //       resetForm();
  //     },
  //   });
  // };

  // const formikForm = useFormik<FormArrayPayload>({
  //   initialValues: createUjianArraySchemaForm.getDefault(),
  //   validationSchema: createUjianArraySchemaForm,
  //   enableReinitialize: true,
  //   onSubmit: onSubmitForm,
  // });
  const formik = useFormik<UjianCreateArrayPayload>({
    initialValues: createUjianArraySchema.getDefault(),
    validationSchema: createUjianArraySchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });
  // const formikTest = useFormik<TestArrayPayload>({
  //   initialValues: createUjianArraySchemaTest.getDefault(),
  //   validationSchema: createUjianArraySchema,
  //   enableReinitialize: true,
  //   // onSubmit: onSubmit,
  // });

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
      <section className="w-1/3">
        <Link href={"/book"}>
          <span className="flex items-center">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-xl font-bold text-gray-500">Tambah Ujian Buku</h2>
        {JSON.stringify(errors)}
        <section>
          <Label htmlFor="nama" title="Nama" isRequired={false} />
          <InputText
            value={""}
            placeholder="text here"
            messageError="isi"
            id="1"
            name="nama"
          ></InputText>
          <Label htmlFor="nama" title="alamat" isRequired={false} />
          <InputText
            value={""}
            placeholder="text here"
            messageError="isi"
            id="2"
            name="alamat"
          ></InputText>

          
        </section>
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
                        <section className="flex items-center justify-between">
                          <h2 className="font-bold  text-2xl">Hasil Ujian</h2>
                          <DeleteButton
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </section>
                        <section className="flex justify-around py-5">
                          <section className="">
                            <Label
                              htmlFor={`data[${index}]mapel`}
                              title="Mapel"
                            />
                            <InputText
                              value={value.mapel}
                              placeholder="Judul mata pelajaran"
                              id={`data[${index}]mapel`}
                              name={`data[${index}]mapel`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isError={
                                getIn(errors?.data?.[index], "mapel")
                                // &&
                                // getIn(touched?.data?.[index], "mapel")
                              }
                              messageError={
                                getIn(errors?.data?.[index], "mapel")
                                // &&
                                // getIn(touched?.data?.[index], "mapel")
                              }
                            />
                          </section>
                          <section>
                            <Label htmlFor="nilai" title="Nilai" />
                            <InputText
                              value={value.nilai}
                              placeholder="masukan nilai"
                              id={`data[${index}]nilai`}
                              name={`data[${index}]nilai`}
                              onChange={(e) => {
                                setFieldValue(
                                  `data[${index}]nilai`,
                                  e.target.value
                                );
                              }}
                              onBlur={handleBlur}
                              isError={getIn(errors?.data?.[index], "nilai")}
                              messageError={getIn(
                                errors?.data?.[index],
                                "nilai"
                              )}
                            />
                          </section>
                        </section>
                      </section>
                    ))}

                  <section>
                    <AddButton
                      onClick={() =>
                        arrayHelpers.push(ujianSchema.getDefault())
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
        <h2 className="pt-10 text-2xl font-bold">Test</h2>
        <section className="py-3 flex justify-between">
          <section className="">
            <Label htmlFor="nama" title="Test1" isRequired={false} />
            <InputText
              value={""}
              placeholder="text here"
              messageError="isi"
              id="1"
              name="nama"
            ></InputText>
          </section>
          <section>
            <Label htmlFor="nama" title="Test2" isRequired={false} />
            <InputText
              value={""}
              placeholder="text here"
              messageError="isi"
              id="2"
              name="alamat"
            ></InputText>
          </section>
        </section>
      </section>
    </section>
  );
};

export default CreateBook;

// function useCreateBulkUjian(): { mutate: any; isLoading: any } {
//   throw new Error("Function not implemented.");
// }
