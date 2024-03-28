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

export const registerSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")

    .required("Wajib isi"),
  avatar: yup.string().nullable().default("").required("Wajib isi"),
});

const UpdateProfile = () => {
  // const {useUploadFile} = useUploadFile();
//   const {data:session,status} = useSession()
  const { useProfile ,useUpdateProfile} = useAuthModule();
  const { data, isFetching } = useProfile();
  const{mutate,isLoading} = useUpdateProfile();
  console.log("profile", data);
  const formik = useFormik<any>({
    initialValues: {
      nama: data?.data?.nama,
      avatar: data?.data?.cover,
      file: undefined,
      id: data?.data?.id,
    },
    
    enableReinitialize: true,
    onSubmit: (values) => {
        mutate(values);
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
    <section>
      <div className="flex items-center justify-center w-full">
        <h1 className="text-3xl text-blue-400">Update Profile</h1>
        {JSON.stringify(values)}
      </div>
      <div>
        <Image
          src={values.avatar || "/img/profile2.jpg"}
          width={100}
          height={100}
          alt="foto orang"
        ></Image>
      </div>
      <FormikProvider value={formik}>
        <Form className="space-y-5" onSubmit={handleSubmit}>
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
          <section className="w-full">
            <input
              type="file"
              id="file"
              onChange={(event: any) => {
                const file = event.target.files[0];
                console.log('file',file)

                // if (file.type !== "image/jpeg") {
                //   return alert("type tidak sesauai");
                // }

                let reader = new FileReader();
                reader.onloadend = () => {
                  setFieldValue(`avatar`, reader.result);
                };
                reader.readAsDataURL(file);
                setFieldValue("file", file);
              }}
            />
          </section>
          <section>
            <Button height="lg" title="Update" colorSchema="blue"  type="submit"/>
          </section>
        </Form>
      </FormikProvider>
    </section>
  );
};

export default UpdateProfile;
