import InputText from "@/components/InputText";
import Label from "@/components/Label";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
// import { BookListFilter } from "../interface";
import Select from "@/components/Select";
import { BukuListFilter } from "../interface";

type FilterProps = {
  params: BukuListFilter;
  setParams: Dispatch<SetStateAction<any>>;
};
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

// const { optionKategori } = useOptions();
// console.log(" option Kategori", optionKategori);

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  const handleChange = (e: ChangeEvent<any>) => {
    // //cara pak ihsan

    // if(e.target.name ='to_year'){
    //   if(Number(params.dari_tahun) >e.target.value){
    //     return alert(`pilih sampai tahun lebih atau sama dengan tahun ${params.dari_tahun}`)
    //   }
    // }

    // if(e.target.name === 'dari_tahun'){
    //   if(e.target.value > Number (params.to_year)){
    //     setParams ((prevParams:BukuListFilter) => {
    //       return {
    //         ...prevParams,
    //         to_year:""
    //       }
    //     })
    //   }
    // }
    // setParams((params:BukuListFilter) => {
    //   return{
    //     ...params,
    //     [e.target.name]:e.target.value,
    //   }
    // })

    // ~~~~~~

    const { name, value } = e.target;

    if (name === "dari_tahun" && value === "2023") {
      setParams((prevParams: BukuListFilter) => {
        return {
          ...prevParams,
          dari_tahun: value,
          ke_tahun: "",
        };
      });
    } else if (
      name === "to_year" &&
      Number(value) < Number(params.dari_tahun)
    ) {
      alert("pilih tahun yang lebih atau sama");
    } else {
      setParams((prevParams: BukuListFilter) => {
        return {
          ...prevParams,
          [name]: value,
        };
      });
    }
  };

  return (
    <section className="space-y-2">
      <section>
        <Label title="judul" htmlFor="judul" />
        <InputText
          // onChange={handleChange}
          onChange={(e) => {
            setParams((prevParams: BukuListFilter) => {
              return {
                ...prevParams,
                judul: e.target.value,
              };
            });
          }}
          value={params.judul}
          name="judul"
          id="judul"
        />
      </section>
      <section>
        <Label title="penulis" htmlFor="penulis" />
        <InputText
          onChange={(e) => {
            setParams((prevParams: BukuListFilter) => {
              return {
                ...prevParams,
                penulis: e.target.value,
              };
            });
          }}
          value={params.penulis}
          name="penulis"
          id="penulis"
        />
      </section>
      <section>
        <Label title="penerbit" htmlFor="penerbit" />
        <InputText
          onChange={(e) => {
            setParams((prevParams: BukuListFilter) => {
              return {
                ...prevParams,
                penerbit: e.target.value,
              };
            });
          }}
          value={params.penerbit}
          name="penerbit"
          id="penerbit"
        />
      </section>
      {/* <section>
        <Label title="kategori" htmlFor="kategori" />
        <Select
          onChange={handleChange}
          options={optionKategori}
          value={params.kategori_id}
          name="kategori"
          id="kategori"
        />
      </section>  */}
      <section>
        <Label title="dari_tahun" htmlFor="dari_tahun" />
        <Select
          onChange={handleChange}
          options={option}
          value={params.dari_tahun}
          name="dari_tahun"
          id="dari_tahun"
        />
      </section>
      <section>
        <Label title="ke_tahun" htmlFor="ke_tahun" />
        <Select
          onChange={handleChange}
          options={option}
          value={params.ke_tahun}
          name="ke_tahun"
          id="ke_tahun"
        />
      </section>
    </section>
  );
};

export default Filter;
