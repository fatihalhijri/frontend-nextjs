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

// const Login = () => {
//   const { useLogin } = useAuthModule();
//   const { mutate, isLoading } = useLogin();
//   const formik = useFormik<LoginPayload>({
//     initialValues: registerSchema.getDefault(),
//     validationSchema: registerSchema,
//     enableReinitialize: true,
//     onSubmit: (payload) => {
//       mutate(payload);
//     },
//   });
//   const { handleChange, handleSubmit, handleBlur, values, errors } = formik;
  
//   // const { data: session } = useSession();
//   // const router = useRouter();
  
//   // useEffect(() => {
//   //   if (session) {
//   //     if(session.user.role == 'admin') {
//   //       router.push('/admin');
//   //     } else {
//   //       router.push('/siswa');
//   //     }
//   //   }
//   // }, [session, router]);
//   return (
//     <section>
//       <div className="flex items-center justify-center w-full">
//         <h1 className="text-3xl text-blue-400">Login</h1>
//       </div>
//       <FormikProvider value={formik}>
//         <Form className="space-y-5" onSubmit={handleSubmit}>
//           <section>
//             <Label htmlFor="email" title="Email" />
//             <InputText
//               value={values.email}
//               placeholder="exampel@email.com"
//               id="email"
//               name="email"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               isError={getIn(errors, "email")}
//               messageError={getIn(errors, "email")}
//             />
//           </section>
//           <section>
//             <Label htmlFor="password" title="Password" />

//             <InputText
//               value={values.password}
//               placeholder="**********"
//               id="password"
//               name="password"
//               type="password"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               isError={getIn(errors, "password")}
//               messageError={getIn(errors, "password")}
//             />
//           </section>
//           <section>
//             <Button
//               height="lg"
//               title="Login"
//               colorSchema="blue"
//               // isLoading={isLoading}
//               isDisabled={isLoading}
//             />
//             <Link href={"/register"}>
//               <Button title="Halaman Register" colorSchema="green" />
//             </Link>
//           </section>
//         </Form>
//       </FormikProvider>
//       <section className="m-3">
//         <GoogleButton onClick={() => signIn('google', { role: 'siswa' })}/>
//       </section>
//     </section>
//   );
// };
const Login: React.FC = () => {
  const { useLogin } = useAuthModule();
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
    
    const { data: session } = useSession();
    const router = useRouter();
    
    useEffect(() => {
      if (session) {
        if(session.user.role == 'admin') {
          router.push('/admin');
        } else {
          router.push('/siswa');
        }
      }
    }, [session, router]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Logika untuk proses login di sini
    console.log('Username:', username);
    console.log('Password:', password);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 6.707a1 1 0 00-1.414 1.414L8.586 12l-4.707 4.707a1 1 0 101.414 1.414l5-5a1 1 0 000-1.414l-5-5zM15 10a1 1 0 011-1h4V7h-4a1 1 0 01-1-1v2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;