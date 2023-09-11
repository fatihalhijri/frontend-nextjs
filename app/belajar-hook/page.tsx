"use client";
import React, { useEffect, useState ,useRef} from "react";
import InputText from "../component/inputText";

const belajarHook = () => {

//   let [message, setMessage] = useState("tes");
//   let [count, setCount] = useState(0);
//   let [text, setState] = useState(false);

//   useEffect(() => {
//     setCount((c) => c + 1);
//     console.log("use effect berjalan");
//   }, [message, text]);

  // kurung siku adalah depedencies
  return (
    <section>
      {/* <p className="">
        siap belajar hook <span className="text-red-500">{count}</span>
      </p>
      <div className="text-red-500 font-bold">{message}</div>
      <InputText
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      /> */}

      <section className="h-[90%] overflow-auto">

        <div className="min-h-screen bg-red-500 flex items-center justify-center">
          <h1 className="text-white">Home </h1>
        </div>
        <div className="min-h-screen bg-blue-500 flex items-center justify-center">
          <h1 className="text-white">Content </h1>
        </div>
        <div className="min-h-screen bg-yellow-500 flex items-center justify-center">
          <h1 className="text-white">About </h1>
        </div>
      </section>

    </section>
  );
};

export default belajarHook;
