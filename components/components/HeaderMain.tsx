"use client";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { FiHeart } from "react-icons/Fi";
import { HiOutlineShoppingBag } from "react-icons/Hi";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

const HeaderMain = () => {
  const { data: session, status } = useSession();
  console.log("sesion", session);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="border-b border-gray-200 py-6 ">
      <div className="container  lg:mx-8 sm:flex justify-between items-center">
        {/* <div className="font-bold flex text-4xl text-center pb-4 sm:pb-0 text-blackish"> */}
        <Image
          alt="perpus"
          src={"/buku1.png"}
          width={40}
          height={40}
          className=" justify-center items-center hidden"
        ></Image>
        {/* </div> */}
        <div className="w-full sm:w-[300px] md:w-[70%] relative">
          <input
            className="border-gray-200 border p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="Enter Any Product name.."
          />

          <BsSearch className="absolute right-0 top-0 mr-3 mt-3 text-gray-400" />
        </div>
        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
          <div className="flex justify-center items-center">
            {/* <p className="text-base px-2">
              hello..{JSON.stringify(session?.user?.name)}
            </p>
            <BiUser className="" /> */}
            <div className="relative inline-block text-left">
              <div className="flex justify-center items-center">
                <p className="text-base px-2">
                  hello..{JSON.stringify(session?.user?.name)}
                </p>
                <BiUser className="cursor-pointer" onClick={toggleDropdown} />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <div className="py-1">
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Link href="/edit-profile">Edit User</Link>
                    </a>
                    <button
                      onClick={() => console.log("Logging out...")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <FiHeart></FiHeart>
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              0
            </div>
          </div>
          <div className="relative">
            <HiOutlineShoppingBag />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
