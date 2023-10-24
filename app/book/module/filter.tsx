import InputText from "@/components/InputText";
import Label from "@/components/Label";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { BookListFilter } from "../interface";
import Select from "@/components/Select";

type FilterProps = {
  params: BookListFilter;
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

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  const handleChange = (e: ChangeEvent<any>) => {
    
    // //cara pak ihsan
    
    // if(e.target.name ='to_year'){
    //   if(Number(params.from_year) >e.target.value){
    //     return alert(`pilih sampai tahun lebih atau sama dengan tahun ${params.from_year}`)
    //   }
    // }

    // if(e.target.name === 'from_year'){
    //   if(e.target.value > Number (params.to_year)){
    //     setParams ((prevParams:BookListFilter) => {
    //       return {
    //         ...prevParams,
    //         to_year:""
    //       }
    //     })
    //   }
    // }
    // setParams((params:BookListFilter) => {
    //   return{
    //     ...params,
    //     [e.target.name]:e.target.value,
    //   }
    // })
    
    // ~~~~~~


    const { name, value } = e.target;

    if (name === "from_year" && value === "2023") {
      setParams((prevParams: BookListFilter) => {
        return {
          ...prevParams,
          from_year: value,
          to_year: "",
        };
      });
    } else if (name === "to_year" && Number(value) < Number(params.from_year)) {
      alert("pilih tahun yang lebih atau sama");
    } else {
      setParams((prevParams: BookListFilter) => {
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
        <Label title="Title" htmlFor="title" />
        <InputText
          // onChange={handleChange}
          onChange={(e) => {
            setParams((prevParams: BookListFilter) => {
              return {
                ...prevParams,
                title: e.target.value,
              };
            });
          }}
          value={params.title}
          name="title"
          id="title"
        />
      </section>
      <section>
        <Label title="Author" htmlFor="author" />
        <InputText
          onChange={(e) => {
            setParams((prevParams: BookListFilter) => {
              return {
                ...prevParams,
                author: e.target.value,
              };
            });
          }}
          value={params.author}
          name="author"
          id="author"
        />
      </section>
      <section>
        <Label title="from_year" htmlFor="from_year" />
        <Select
          onChange={handleChange}
          options={option}
          value={params.from_year}
          name="from_year"
          id="from_year"
        />
      </section>
      <section>
        <Label title="to_year" htmlFor="to_year" />
        <Select
          onChange={handleChange}
          options={option}
          value={params.to_year}
          name="to_year"
          id="to_year"
        />
      </section>
    </section>
  );
};

export default Filter;
