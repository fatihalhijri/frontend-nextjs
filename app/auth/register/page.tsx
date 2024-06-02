"use client";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import { Form, FormikProvider, getIn, useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import { RegisterPayload } from "../interface";
import useAuthModule from "../lib";
import Select from "@/components/Select";

export const registerSchema = yup.object().shape({
  nama: yup.string().nullable().default("").required("wajib diisi"),
  namaLengkap: yup.string().nullable().default("").required("wajib diisi"),
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
  alamat: yup.string().nullable().default("").required("wajib diisi"),
  role: yup.string().nullable().default(undefined).required("Wajib pilih"),
});
export const option = [
  // {
  //   value: "",
  //   label: "Pilih",
  // },
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "peminjam",
    label: "Peminjam",
  },
];
const Register = () => {
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const { useRegister } = useAuthModule();
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };
  const {
    mutate,
    isLoading,
    isError,
    error,
    handleShowError,
    handleTyping,
    selectedRole,
    setSelectedRole,
  } = useRegister();
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
    <section
      className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgroundbuku.png')" }}
    >
      <div className="max-w-md w-full md:space-y-8">
        {/* error:{JSON.stringify(errors)} <br />
        values: {JSON.stringify(values)} */}
        <div className="bg-white py-5 px-6 shadow rounded-lg sm:px-10">
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} className="space-y-2">
              <section>
                <Label htmlFor="nama" title="Nama" />
                <InputText
                  value={values.nama}
                  onChange={(e) => {
                    setFieldValue("nama", e.target.value);
                    handleTyping("nama");
                  }}
                  onBlur={handleBlur}
                  placeholder="Ketikan Nama"
                  id="nama"
                  name="nama"
                  isError={getIn(errors, "nama")}
                  messageError={errors?.nama}
                />
              </section>
              <section>
                <Label htmlFor="namaLengkap" title="namaLengkap" />
                <InputText
                  value={values.namaLengkap}
                  placeholder="Ketikan namaLengkap"
                  id="namaLengkap"
                  name="namaLengkap"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={!!errors.namaLengkap}
                  messageError={errors.namaLengkap}
                />
              </section>
              <section>
                <Label htmlFor="email" title="Email" />
                <InputText
                  value={values.email}
                  placeholder="Ketikan Email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={!!errors.email}
                  messageError={errors.email}
                />
              </section>
              <section>
                <Label htmlFor="password" title="Password" />
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
                  onBlur={handleBlur}
                  isError={!!errors.password}
                  messageError={errors.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </section>
              <section>
                <Label htmlFor="alamat" title="alamat" />
                <InputText
                  value={values.alamat}
                  placeholder="Ketikan alamat"
                  id="alamat"
                  name="alamat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={!!errors.alamat}
                  messageError={errors.alamat}
                />
              </section>
              <section>
                <Label htmlFor="role" title="role" />
                <Select
                  value={values.role}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="role"
                  name="role"
                  options={option}
                  isError={!!errors.role}
                  // messageError={errors.role}
                />
              </section>
              {/* <section>
                <Label htmlFor="role" title="Role" />
                <Select
                options={option}
                  id="role"
                  name="role"
                  value={values.role}
                  onChange={handleSelectChange}
                  onBlur={handleBlur}
                  isError={!!errors.role}
                >
                 
                </Select>
                
              </section> */}
              <section>
                <Button
                  height="lg"
                  title="Register"
                  colorSchema="blue"
                  isDisabled={isLoading}
                  onBlur={handleBlur}
                />
                <Link href="login">
                  <Button title="Halaman Login" colorSchema="green" />
                </Link>
              </section>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </section>
  );
};

export default Register;
