"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";

import * as yup from "yup";
import { LoginPayload } from "../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../lib";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GoogleButton from 'react-google-button'


export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

const Login = () => {
  const [isEmailActive, setIsEmailActive] = useState(false)
  const [isPasswordActive, setIsPasswordActive] = useState(false)
  const { useLogin } = useAuthModule();
  const { mutate, isLoading, isError,error} = useLogin();
  const formik = useFormik<LoginPayload>({
    initialValues: loginSchema.getDefault(),
    // validationSchema: loginSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;
  
  const errorMessage = isError ? error.response?.data.messsage || [] : []
  const emailError = errorMessage.find((msg:any) =>msg.includes('username'));
  const passwordError = errorMessage.find((msg:any) => msg.includes('password'))
  // const { data: session } = useSession();
  // const router = useRouter();
  
  // useEffect(() => {
  //   if (session) {
  //     if(session.user.role == 'admin') {
  //       router.push('/admin');
  //     } else {
  //       router.push('/siswa');
  //     }
  //   }
  // }, [session, router]);
  return (
    <section>
      <div className="flex items-center justify-center w-full">
        <h1 className="text-3xl text-blue-400">Login</h1>
      </div>
      <FormikProvider value={formik}>
        <Form className="space-y-5" onSubmit={handleSubmit}>
          <section>
            <Label htmlFor="email" title="Username" />
            <InputText
              value={values.username}
              placeholder="exampel@email.com"
              id="username"
              name="username"
              onChange={handleChange}
              // onBlur={handleBlur}
              // isError={getIn(errors, "username")}
              // messageError={getIn(errors, "username")}
              isError={isEmailActive ? emailError : null}
              messageError={isEmailActive ? emailError : null}
            />
          </section>
          <section>
            <Label htmlFor="password" title="Password" />

            <InputText
              value={values.password}
              placeholder="**********"
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              // onBlur={handleBlur}
              // isError={getIn(errors, "password")}
              // messageError={getIn(errors, "password")}
              isError={isPasswordActive ? passwordError : null}
              messageError={isPasswordActive ? passwordError : null}
            />
          </section>
          <section>
            <Button
              height="lg"
              title="Login"
              colorSchema="blue"
              // isLoading={isLoading}
              isDisabled={isLoading}
            />
            <Link href={"/register"}>
              <Button title="Halaman Register" colorSchema="green" />
            </Link>
          </section>
        </Form>
      </FormikProvider>
      {/* <section className="m-3">
        <GoogleButton onClick={() => signIn('google', { role: 'siswa' })}/>
      </section> */}
    </section>
  );
};

export default Login;