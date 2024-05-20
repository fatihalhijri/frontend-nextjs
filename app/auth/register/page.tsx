"use client";

import InputText from "@/components/InputText";
import Label from "@/components/Label";
import React, { useState } from "react";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import { RegisterPayload } from "../interface";
import Button from "@/components/Button";
import Link from "next/link";
import useAuthModule from "../lib";
import useValidation from "@/hook/useValidation";
import { isError } from "@tanstack/react-query";

export const registerSchema = yup.object().shape({
  nama: yup.string().nullable().default("").required("wajib diisi"),
  email: yup
    .string()
    .nullable()
    .default("")
    .email("gunakan format email")
    .required("wajib diisi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("wajib diisi")
    .min(8, "minimal 8 karakter"),
});

const Register = () => {
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const { useRegister } = useAuthModule();
  const { mutate, isLoading,isError,error, handleShowError, handleTyping } = useRegister();
  const formik = useFormik<RegisterPayload>({
    initialValues: registerSchema.getDefault(),
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
      console.log("values", values);
      resetForm();
    },
  });
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
    setFieldValue,
    touched,
  } = formik;
  const errorMessage = isError ? error.response?.data.messsage || [] : [];
  const emailError = errorMessage.find((msg: any) => msg.includes("email"));
  const passwordError = errorMessage.find((msg: any) =>
    msg.includes("password")
  );

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>
        error:{JSON.stringify(errors)} <br />
        values: {JSON.stringify(values)}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="nama" title="Nama"></Label>
              <InputText
                value={values.nama}
                onChange={(e) => {
                  setFieldValue("nama", e.target.value);
                  // if ('ihsan' ==)
                    handleTyping('nama')
                }}
                // onChange= {handleChange} // tipe sederhana
                onBlur={handleBlur} 
                placeholder="Ketikan Nama"
                id="nama"
                name="nama"
                isError={getIn(errors, "nama")}
                // isError={
                //   getIn(errors?.nama, "nama") &&
                //   getIn(touched?.nama, "nama")
                // }
                messageError={errors?.nama}
                // messageError={getIn(
                //   errors?.nama,
                //   "nama"
                // )}
              />
              {/* {formik.touched.nama && formik.errors.nama && (
                  <div>{formik.errors.nama}</div>
                )} */}
            </section>
            <section>
              <Label htmlFor="email" title="Email"></Label>
              <InputText
                value={values.email}
                placeholder="Ketikan  Email"
                id="email"
                name="email"
                onChange={handleChange}
                
                isError={!!errors.email}
                messageError={errors.email}
                // isError={
                //   getIn(errors?.email, "email") &&
                //   getIn(touched?.email, "email")
                // }
                // messageError={getIn(
                //   errors?.email,
                //   "email"
                // )}
              />
              {/* {formik.touched.email && formik.errors.email && (
                  <div>{formik.errors.email}</div>
                )} */}
            </section>
            <section>
              <Label htmlFor="password" title="Password"></Label>
              <InputText
                value={values.password}
                placeholder="Ketikan Password"
                id="password"
                name="password"
                type="password"
                onChange={(e) => {
                  handleChange(e);
                  handleTyping("password");
                }}
                // onBlur={handleBlur}
                // isError={getIn(errors, "password") && handleShowError}
                // messageError={getIn(errors, "password") && handleShowError}

                isError={!!errors.password}

                // isError={
                //   getIn(errors?.password, "password") &&
                //   getIn(touched?.password, "password")
                // }
                messageError={errors.password}
                // onBlur={handleBlur}
              />
                {formik.touched.password && formik.errors.password && (
                  <div>{formik.errors.password}</div>
                )}
              
            </section>
            <section>
              <Button
                height="lg"
                title="Register"
                colorSchema="blue"
                // isLoading={isLoading}
                isDisabled={isLoading}
                onBlur={handleBlur}
              />
              <Link href={"login"}>
                <Button title="HalamanLogin" colorSchema="green" />
              </Link>
            </section>
          </Form>
        </FormikProvider>
      </div>
    </section>
  );
};

export default Register;
