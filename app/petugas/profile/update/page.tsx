"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";

import * as yup from "yup";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "@/app/auth/lib";
import Image from "next/image";
import useUploadFile from "@/hook/useUploadFile";
import { useSession } from "next-auth/react";
import { ProfileUpdatePayload } from "@/app/auth/interface";

export const registerSchema = yup.object().shape({
  nama: yup.string().nullable().default("").required("Wajib isi"),
  namaLengkap: yup.string().nullable().default("").required("Wajib isi"),
  alamat: yup.string().nullable().default("").required("Wajib isi"),
  // avatar: yup.string().nullable().default("").required("Wajib isi"),
});

const UpdateProfile = () => {
  // const {useUploadFile} = useUploadFile();
  //   const {data:session,status} = useSession()
  const { useProfile, useUpdateProfile } = useAuthModule();
  const { data, isFetching } = useProfile();

  const { data: session, status } = useSession();
  const { mutate, isLoading } = useUpdateProfile();
  console.log("profile", data);
  const formik = useFormik<any>({
    initialValues: {
      nama: data?.data?.nama,
      namaLengkap: data?.data?.namaLengkap,
      alamat: data?.data.alamat,
      // avatar: data?.data?.avatar,
      // file: undefined,

      id: data?.data?.id,
    },

    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
      console.log("submit jalan", values);
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    setFieldValue,
  } = formik;

  return (
    <section className="flex items-center py-5 justify-center w-full h-full">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-6  md:py-10 py-3">
          <div className="">
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Update Profile {JSON.stringify(session?.user?.role)}
            </h1>
          </div>

          <FormikProvider value={formik}>
            <Form className="space-y-5 md:py-5 py-3" onSubmit={handleSubmit}>
              <section>
                <Label htmlFor="nama" title="Nama" />
                <InputText
                  value={values.nama}
                  placeholder="ketikkan nama anda "
                  id="nama"
                  name="nama"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "nama")}
                  messageError={getIn(errors, "nama")}
                />
              </section>
              <section>
                <Label htmlFor="namaLengkap" title="NamaLengkap" />
                <InputText
                  value={values.namaLengkap}
                  placeholder="ketikkan namaLengkap anda "
                  id="namaLengkap"
                  name="namaLengkap"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "namaLengkap")}
                  messageError={getIn(errors, "namaLengkap")}
                />
              </section>
              <section>
                <Label htmlFor="alamat" title="alamat" />
                <InputText
                  value={values.alamat}
                  placeholder="ketikkan alamat anda "
                  id="alamat"
                  name="alamat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "alamat")}
                  messageError={getIn(errors, "alamat")}
                />
              </section>

              <section>
                <Button
                  height="lg"
                  title="Update"
                  colorSchema="blue"
                  type="submit"
                />
              </section>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
