"use client";
import Button from "@/app/component/button";
import React, { useRef } from "react";

const pakeRef = () => {
  const targetAbout = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    console.log("target about", targetAbout);

    targetAbout.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    
  };
  const mouseEnter = () => {
    if (targetAbout.current) {
      const node = document.createElement("div");
      node.className = "text-white bg-red-500 p-2";
      const textnode = document.createTextNode("selamat datang");
      node.appendChild(textnode);
      targetAbout.current.appendChild(node);

      targetAbout.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const mouseLeave = () => {
    if (targetAbout.current) {
      const node = document.getElementById("div");
      node?.addEventListener('mouseleave',()=>{
        node.remove
      })
      

      targetAbout.current.scrollIntoView({
        // behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <nav className="h-[50px]">
        <Button colorSchema="blue" variant="solid" title="Home" />
        <Button colorSchema="red" variant="solid" title="Content" />
        <Button
          onClick={scrollToAbout}
          onMouseLeave={mouseLeave}
          colorSchema="green"
          variant="solid"
          title="About"
        />
      </nav>
      <section className="h-[90%] overflow-auto">
        <div className="min-h-screen bg-red-500 flex items-center justify-center">
          <h1 className="text-white">Home </h1>
        </div>
        <div className="min-h-screen bg-blue-500 flex items-center justify-center">
          <h1 className="text-white">Content </h1>
        </div>
        <div
          ref={targetAbout}
          onMouseEnter={mouseEnter}
          className="min-h-screen bg-yellow-500 flex items-center justify-center"
        >
          <h1 className="text-white">About </h1>
        </div>
      </section>
    </>
  );
};

export default pakeRef;
