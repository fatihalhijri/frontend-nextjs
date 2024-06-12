"use client";
import { Globe } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiHeart } from "react-icons/Fi";
import { HiOutlineShoppingBag } from "react-icons/Hi";
import { BiUser } from "react-icons/bi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      setTimeout(() => {
        router.replace('/login');
      }, 500); // Adjust the delay as needed
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="bg-gray-800 ">
      <div className=" container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {/* <span className="sr-only">Open main menu</span> */}
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex-shrink-0">
              <Link href="/">
                <p className="text-white text-xl font-bold font-serif navbar__link relative ">
                  PustakaOnline
                </p>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href="/home">
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Beranda
                  </p>
                </Link>
                <Link href="/about">
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Tentang
                  </p>
                </Link>
                {/* <Link href="/services">
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Services
                  </p>
                </Link> */}
                <Link href="/contact">
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Kontak
                  </p>
                </Link>
                <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
                  <div className="flex justify-center items-center">
                    {/* <p className="text-base px-2">
              hello..{JSON.stringify(session?.user?.name)}
            </p>
            <BiUser className="" /> */}
                    <div className="relative inline-block text-left">
                      <div className="flex justify-center items-center">
                        <p className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                          hello..{JSON.stringify(session?.user?.name)}
                        </p>
                        <BiUser
                          className="cursor-pointer "
                          onClick={toggleDropdown}
                        />
                      </div>

                      {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                          <div className="py-1">
                            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <Link href="/admin/profile/update">
                                Edit User
                              </Link>
                            </p>
                            <button
                              // onClick={() => {
                              //   signOut({ redirect: false }).then(() =>
                              //     router.push("auth/login")
                              //   );
                              // }}
                              onClick={handleLogout}
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
                  <div className="">
                    <Globe size={28}></Globe>
                    {/* <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              0
            </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/">
              <p className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </p>
            </Link>
            <Link href="/about">
              <p className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                About
              </p>
            </Link>
            <Link href="/services">
              <p className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Services
              </p>
            </Link>
            <Link href="/contact">
              <p className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
