"use client";
import { useEffect, useState } from "react";
import Buttoncal from "./component/buttoncal";
import { Result } from "postcss";
import useDebounce from "./hook/useDebounce";

const Home = () => {
  const [calcu, setcalcu] = useState("0");
  const [hasil, setHasil] = useState("");
  let {debouncedValue} = useDebounce(calcu,500)

  const buttononklik = (title: any) => {
    if (title === "=") {
      jumlah();
    } else if (title === "c") {
      setcalcu("0");
      setHasil("");
    } else if (title === ",") {
      if (!calcu.includes(",")) {
        setcalcu((prevcalcu) => prevcalcu + title);
      }
    } else {
      if (calcu === "0") {
        setcalcu(title);
      } else {
        setcalcu((prevcalcu) => prevcalcu + title);
      }
    }
  };

  const deleteangka = () => {
    setcalcu((prevcalcu) => prevcalcu.slice(0, -1));
  };

  const jumlah = () => {
    const result = eval(calcu);
    setHasil(result);
  };
  return (
    <>
      <main className="flex justify-center bg-transparent my-10 ">
        <section className="w-[800px] flex flex-col gap-7 p-20 h-full bg-gray-200 rounded-md">
          <span className="flex justify-center items-center">
            <h1 className="font-medium text-center text-xl w-[40%]">
              Penilaian tengah semester front-end developer
            </h1>
          </span>
          <div className="bg-white w-full font-semibold text-3xl flex justify-between h-[100px] border-2 p-3 border-gray-500/50 rounded">
            <span>{calcu}</span>
            <span className="items-end flex">{hasil}</span>
          </div>
          <div className="grid grid-cols-4 gap-5">
            <Buttoncal
              title="7"
              colorSchema="gray"
              onClick={() => buttononklik("7")}
            />
            <Buttoncal
              title="8"
              colorSchema="gray"
              onClick={() => buttononklik("8")}
            />
            <Buttoncal
              title="9"
              colorSchema="gray"
              onClick={() => buttononklik("9")}
            />
            <Buttoncal title="DEL" colorSchema="red" onClick={deleteangka} />
            <Buttoncal
              title="4"
              colorSchema="gray"
              onClick={() => buttononklik("4")}
            />
            <Buttoncal
              title="5"
              colorSchema="gray"
              onClick={() => buttononklik("5")}
            />
            <Buttoncal
              title="6"
              colorSchema="gray"
              onClick={() => buttononklik("6")}
            />
            <Buttoncal
              title="+"
              colorSchema="blue"
              onClick={() => buttononklik("+")}
            />
            <Buttoncal
              title="1"
              colorSchema="gray"
              onClick={() => buttononklik("1")}
            />
            <Buttoncal
              title="2"
              colorSchema="gray"
              onClick={() => buttononklik("2")}
            />
            <Buttoncal
              title="3"
              colorSchema="gray"
              onClick={() => buttononklik("3")}
            />
            <Buttoncal
              title="-"
              colorSchema="blue"
              onClick={() => buttononklik("-")}
            />
            <button onClick={() => {
                setcalcu("0");
                setHasil("");
              }} className="  text-white  bg-red-500 text-center items-center flex justify-center rounded-md">
              C
            </button>
            <div className="grid grid-cols-1 gap-5">
              <Buttoncal
                title="0"
                colorSchema="gray"
                onClick={() => buttononklik("0")}
              />
              <Buttoncal
                title=","
                colorSchema="yellow"
                onClick={() => buttononklik(",")}
              />
            </div>

            <Buttoncal
              title="x"
              colorSchema="blue"
              onClick={() => buttononklik("*")}
            />
            <div className="grid grid-cols-1 gap-5">
              <div className="grid grid-cols-1 gap-5">
                <Buttoncal
                  title="/"
                  colorSchema="blue"
                  onClick={() => buttononklik("/")}
                />
              </div>
              <div className="-ml-[170px]">
                <button  className="col-span-2 col-start-3 h-20 w-[320px] text-white  bg-blue-500 text-center items-center flex justify-center rounded-md" onClick={jumlah}>
                  =
                </button>
                
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
