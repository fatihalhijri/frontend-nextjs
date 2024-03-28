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
  username: yup
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
  const [isEmailActive, setIsEmailActive] = useState(false)
  const [isPasswordActive, setIsPasswordActive] = useState(false)
  const { useRegister } = useAuthModule();
  const { mutate, isLoading, isError, error, handleShowError,handleTyping} = useRegister();
  const formik = useFormik<RegisterPayload>({
    initialValues: registerSchema.getDefault(),
    // validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
      console.log('values',values)
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
  } = formik;
  const errorMessage = isError ? error.response?.data.messsage || [] : []
  const emailError = errorMessage.find((msg:any) =>msg.includes('username'));
  const passwordError = errorMessage.find((msg:any) => msg.includes('password'))


  return (
    <section>
      <div className="flex items-center justify-center w-full">
        <h1 className="text-3xl text-blue-400">Register</h1>
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
              }}
              // onChange= {handleChange} // tipe sederhana
              placeholder="Ketikan Nama"
              id="nama"
              name="nama"
              isError={getIn(errors, "nama")}
              onBlur={handleBlur}
              // messageError={errors?.nama}
              messageError={getIn(errors, "nama")|| handleShowError}
            ></InputText>
          </section>
          <section>
            <Label htmlFor="username" title="UserName"></Label>
            <InputText
              value={values.username}
              placeholder="Ketikan  Username anda"
              id="username"
              name="username"
              onChange={(e) => {
                // handleChange(e);
                // handleTyping('email')
                setFieldValue('username', e.target.value)
                setIsEmailActive(false)
              }}
              onBlur={handleBlur}
              isError={isEmailActive ? emailError : null}
              messageError={isEmailActive ? emailError : null}
              // isError={getIn(errors, "username") }
              // messageError={getIn(errors, "username") || handleShowError}

            ></InputText>
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
                handleChange(e)
                handleTyping('password')
              }}
              isError={isPasswordActive ? passwordError : null}
              messageError={isPasswordActive ? passwordError : null}
              // isError={getIn(errors, "password")}
              // onBlur={handleBlur}
              // messageError={getIn(errors, "password")|| handleShowError}
              // isError={getIn(errors, "password") || handleShowError}
              // messageError={getIn(errors, "password") || handleShowError}
              // onBlur={handleBlur}
              
              >

              {formik.touched.username && formik.errors.username && (
                <div>{formik.errors.username}</div>
              )}
            </InputText>
          </section>
          <section>
            <Button
              height="lg"
              title="Register"
              colorSchema="blue"   
              // isLoading={isLoading}
              isDisabled={isLoading}
            />
            <Link href={"login"}>
              <Button title="HalamanLogin" colorSchema="green" />
            </Link>
          </section>
        </Form>
      </FormikProvider>
    </section>
  );
};

export default Register;
