"use client";
import Button from "@/components/Button";
import { AddButton, DeleteButton } from "@/components/ButtonAction";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import {
  ArrayHelpers,
  FieldArray,
  Form,
  FormikProvider,
  getIn,
  useFormik,
} from "formik";
import * as yup from "yup";
import { ProdukCreateArrayPayload } from "../interface";
import CurrencyInput from "react-currency-input-field";
import clsx from "clsx";
import Select from "@/components/Select";
import useOptions from "@/hook/useOption";
import CurrencyInputText from "@/components/currencyInput";
import { useState } from "react";
import useProdukModule from "../lib";

export const createBookSchema = yup.object().shape({
  barcode: yup.string().nullable().default("").required("Wajib isi"),
  nama_produk: yup.string().nullable().default("").required("Wajib isi"),
  deskripsi_produk: yup
    .string()
    .nullable()
    .default(undefined)
    .required("Wajib Isi"),
  harga: yup.number().nullable().default(undefined).required("Wajib isi"),
  stok: yup.number().nullable().default(undefined).required("Wajib isi"),
  kategori_id: yup
    .number()
    .nullable()
    .default(undefined)
    .required("Wajib pilih"),
});
export const option = [
  {
    value: 2020,
    label: "2020",
  },
  {
    value: 2021,
    label: "2021",
  },
  {
    value: 2022,
    label: "2022",
  },
  {
    value: 2023,
    label: "2023",
  },
];

const defaultProdukArray = {
  data: [
    {
      barcode: `${new Date().getTime()}`,
      nama_produk: "",
      deskripsi_produk: "",
      harga: null,
      stok: null,
      kategori_id: undefined || null || 0,
    },
  ],
};

const createBookArraySchema = yup
  .object()
  .shape({ data: yup.array().of(createBookSchema) })
  .default(defaultProdukArray);

const TambahProduk = () => {
  // const [value, setValue] = useState<string | number | undefined>(undefined);
  // const [isError, setIsError] = useState(false);

  // const handleValueChange = (value: string | undefined, name: string) => {
  //   setValue(value);
  //   if (!value || Number(value) <= 0) {
  //     setIsError(true);
  //   } else {
  //     setIsError(false);
  //   }
  // };
  const{useCreateProdukBulk} = useProdukModule();
  const {mutate,isLoading} = useCreateProdukBulk();
  const formik = useFormik<ProdukCreateArrayPayload>({
    initialValues: defaultProdukArray,
    validationSchema: createBookArraySchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          setValues(createBookArraySchema.getDefault());
        },
      }); 
      console.log("values", values);
    },
  });
  const { optionKategori } = useOptions();
  console.log(" option Kategori", optionKategori);

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
    <>
      <div>Ini halaman Tambah Buku Bulk</div>
      <FormikProvider value={formik}>
        <Form className="space-y-5">
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
                      <section className="flex items-center justify-end">
                        <DeleteButton
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      </section>
                      <section>
                        <Label
                          htmlFor={`data[${index}]nama_produk`}
                          title="nama_produk"
                        />
                        <InputText
                          value={value.nama_produk}
                          placeholder="Minuman"
                          id={`data[${index}]nama_produk`}
                          name={`data[${index}]nama_produk`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isError={
                            getIn(errors?.data?.[index], "nama_produk") &&
                            getIn(touched?.data?.[index], "nama_produk")
                          }
                          // messageError={`${!!errors.data?.[index]}`}

                          messageError={getIn(
                            errors?.data?.[index],
                            "nama_produk"
                          )}
                        />
                      </section>
                      <section>
                        <Label
                          htmlFor={`data[${index}]barcode`}
                          title="barcode"
                        />
                        <InputText
                          disabled
                          value={value.barcode}
                          placeholder="XXXX-XXXX-XXXX"
                          id={`data[${index}]barcode`}
                          name={`data[${index}]barcode`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isError={
                            getIn(errors?.data?.[index], "barcode") &&
                            getIn(touched?.data?.[index], "barcode")
                          }
                          messageError={getIn(errors?.data?.[index], "barcode")}
                        />
                      </section>
                      <section>
                        <Label
                          htmlFor={`data[${index}]deskripsi_produk`}
                          title="deskripsi_produk"
                        />
                        <InputText
                          value={value.deskripsi_produk}
                          placeholder="Deskripsi produk"
                          id={`data[${index}]deskripsi_produk`}
                          name={`data[${index}]deskripsi_produk`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isError={
                            getIn(errors?.data?.[index], "deskripsi_produk") &&
                            getIn(touched?.data?.[index], "deskripsi_produk")
                          }
                          messageError={getIn(
                            errors?.data?.[index],
                            "deskripsi_produk"
                          )}
                        />
                      </section>
                      <section>
                        <Label htmlFor={`data[${index}]harga`} title="harga" />

                        <CurrencyInput
                        
                          id={`data[${index}]harga`}
                          name={`data[${index}]harga`}
                          value={value.harga || 0}
                          placeholder="Rp. 0"
                          decimalsLimit={2}
                          prefix="Rp. "
                          decimalSeparator=","
                          groupSeparator="."
                          onValueChange={(value)=> {
                            setFieldValue(`data[${index}]harga`, value)
                          }}
                          // onChange={handleChange}
                          style={{
                            height: 40,
                            margin: 0,
                          }}
                          className={clsx(
                            `pl-3 py-2 h-5 w-full text-sm rounded border-2  focus:outline-none focus:ring-2`,
                            {
                              "hover:ring-red-500 focus:ring-red-500 border-red-500":
                                getIn(
                                  errors?.data?.[index],
                                  "harga"
                                ) &&
                                getIn(
                                  touched?.data?.[index],
                                  "harga"
                                ) === true,
                                "hover:ring-blue-500 focus:ring-red-500 border-black":
                                getIn(
                                  errors?.data?.[index],
                                  "harga"
                                ) &&
                                getIn(
                                  touched?.data?.[index],
                                  "harga"
                                ) === false
                            }
                          )}
                        />

                        {/* <CurrencyInputText
                          id={`data[${index}]harga`}
                          name={`data[${index}]harga`}
                          value={value.harga || ''}
                          
                          // onChange={handleChange}
                          
                          onValueChange={handleChange}
                          onBlur={handleBlur}
                          isError={
                            getIn(errors?.data?.[index], "harga") &&
                            getIn(touched?.data?.[index], "harga")
                          }
                          messageError={getIn(errors?.data?.[index], "harga")}
                        ></CurrencyInputText> */}
                        
                      </section>
                      <section>
                        <Label htmlFor={`data[${index}]stok`} title="stok" />
                        <InputText
                          value={value.stok || ""}
                          placeholder="berikan stok anda"
                          id={`data[${index}]stok`}
                          name={`data[${index}]stok`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isError={
                            getIn(errors?.data?.[index], "stok") &&
                            getIn(touched?.data?.[index], "stok")
                          }
                          messageError={getIn(errors?.data?.[index], "stok")}
                        />
                      </section>
                      <section>
                        <Label htmlFor="kategori_id" title="Kategori" />
                        <Select
                          value={value.kategori_id || 0}
                          id={`data[${index}]kategori_id`}
                          name={`data[${index}]kategori_id`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={optionKategori}
                          isError={
                            getIn(errors?.data?.[index], "kategori_id") &&
                            getIn(touched?.data?.[index], "kategori_id")
                          }
                          messageError={getIn(
                            errors?.data?.[index],
                            "kategori_id"
                          )}
                        />
                      </section>
                    </section>
                  ))}

                <section>
                  <AddButton
                    onClick={() =>
                      // arrayHelpers.push(createBookSchema.getDefault())
                      arrayHelpers.push(createBookSchema.getDefault())
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
              // isDisabled={isLoading}
            />
          </section>
        </Form>
      </FormikProvider>
    </>
  );
};

export default TambahProduk;
