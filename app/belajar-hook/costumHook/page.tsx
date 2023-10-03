"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/app/component/button";
import { useClosure } from "@/app/hook/useClosure";
import InputText from "@/app/component/inputText";
import useDebounce from "@/app/hook/useDebounce";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const { isOpen, onOpen, onClose } = useClosure();
  // let [debouncedValue, setDebouncedValue] = useState("");
  let {debouncedValue} = useDebounce(keyword,500);
  

  return (
    <section className="h-screen w-screen space-y-5">
      <Button
        onClick={onOpen}
        colorSchema="blue"
        title="open"
        variant="solid"
      />
      <Button
        onClick={onClose}
        colorSchema="red"
        title="closed"
        variant="solid"
      />
      <InputText
     value={keyword}
     placeholder="nama"
     onChange={(e) =>{
      setKeyword(e.target.value);
     }}
     />
      debouncedValue:{debouncedValue}
      {isOpen ? <p>Open</p> : <p>Close</p>}
    </section>
  );
};

export default Home;
