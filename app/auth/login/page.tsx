"use client";

import { Form, FormikProvider, getIn, useFormik } from "formik";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import GoogleButton from "react-google-button";
import * as yup from "yup";
import { LoginPayload } from "../interface";
import useAuthModule from "../lib";

export const registerSchema = yup.object().shape({
  email: yup
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
  const { useLogin } = useAuthModule();
  console.log("status", status);
  const { mutate, isLoading } = useLogin();
  const formik = useFormik<LoginPayload>({
    initialValues: registerSchema.getDefault(),
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

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
    <section
      className="min-h-screen  flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgroundbuku.png')" }}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <div className="">
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h1>
          </div>
          error:{JSON.stringify(errors)} <br />
          values: {JSON.stringify(values)}
          <FormikProvider value={formik}>
            <Form className="space-y-5" onSubmit={handleSubmit}>
              {/* <Label title="Login" htmlFor="login"></Label> */}
              <section>
                <Label htmlFor="email" title="Email" />
                <InputText
                  value={values.email}
                  placeholder="exampel@email.com"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "email")}
                  messageError={getIn(errors, "email")}
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
                  onBlur={handleBlur}
                  isError={getIn(errors, "password")}
                  messageError={getIn(errors, "password")}
                />
                <Link href={"/lupapass"} className="flex justify-end">
                  <p className="text-sm text-blue-700  ">Lupa Password?</p>
                </Link>
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
          <br />
          <br />
          <section className="">
            <GoogleButton onClick={() => signIn("google", { role: "siswa" })} />
          </section>
        </div>
      </div>
    </section>
  );
};

export default Login;
