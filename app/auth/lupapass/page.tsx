"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";

import * as yup from "yup";
import {  LupaPasswordPayload,  } from "../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../lib";
import Link from "next/link";

export const LupaPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
  
});

const LupaPassword = ({params}:any) => {
  const { useLupaPassword } = useAuthModule();
  const { mutate, isLoading } = useLupaPassword();
  const formik = useFormik<LupaPasswordPayload>({
    initialValues: LupaPasswordSchema.getDefault(),
    validationSchema: LupaPasswordSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <section>
    <div className="flex items-center justify-center w-full">
      <h1 className="text-2xl font-bold text-red-500">Lupa Password</h1>
    </div>
    <FormikProvider value={formik}>
      <Form className="space-y-5" onSubmit={handleSubmit}>
        <section>
          <Label htmlFor="email" title="Email" />
          <InputText
            value={values.email}
            placeholder="ketikan email anda"
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            isError={getIn(errors, "email")}
            messageError={getIn(errors, "email")}
          />
        </section>
        <section>
          <Button
            height="lg"
            title="Send Email"
            colorSchema="blue"
            // isLoading={isLoading}
            isDisabled={isLoading}
          />
          <br /><br />
          <Link href={"/auth/login"}>
            <Button title="Back" colorSchema="green" />
          </Link>
        </section>
      </Form>
    </FormikProvider>
  </section>
  );
};

export default LupaPassword;