'use client';
// import {CartContext} from "@/components/AppContext";
// import Bars2 from "@/components/icons/Bars2";
// import ShoppingCart from "@/components/icons/ShoppingCart";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useContext, useState} from "react";
import ShoppingCart from "../icons/ShoppingCart";
import Bars2 from "../icons/Bars2";

function AuthLinks({status, userName}:any) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2">
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
//   const {cartProducts} = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href={'/'}>
          ST PIZZA
        </Link>
        {/* <div className="flex gap-8 items-center">
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen(prev => !prev)}>
            <Bars2 />
          </button>
        </div> */}
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={'/'}>
            ST PIZZA
          </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        {/* <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
        </nav> */}
      </div>
    </header>
    // <nav className="bg-gray-800">
    //   <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    //     <div className="relative flex items-center justify-between h-16">
    //       <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
    //         <button
    //           onClick={() => setIsOpen(!isOpen)}
    //           type="button"
    //           className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    //           aria-controls="mobile-menu"
    //           aria-expanded="false"
    //         >
    //           <span className="sr-only">Open main menu</span>
    //           {!isOpen ? (
    //             <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    //             </svg>
    //           ) : (
    //             <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    //             </svg>
    //           )}
    //         </button>
    //       </div>
    //       <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
    //         <div className="flex-shrink-0">
    //           <Link href="/">
    //             <p className="text-white text-xl font-bold">MyLogo</p>
    //           </Link>
    //         </div>
    //         <div className="hidden sm:block sm:ml-6">
    //           <div className="flex space-x-4">
    //             <Link href="/">
    //               <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</p>
    //             </Link>
    //             <Link href="/about">
    //               <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</p>
    //             </Link>
    //             <Link href="/services">
    //               <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</p>
    //             </Link>
    //             <Link href="/contact">
    //               <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</p>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {isOpen && (
    //     <div className="sm:hidden" id="mobile-menu">
    //       <div className="px-2 pt-2 pb-3 space-y-1">
    //         <Link href="/">
    //           <p className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</p>
    //         </Link>
    //         <Link href="/about">
    //           <p className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</p>
    //         </Link>
    //         <Link href="/services">
    //           <p className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</p>
    //         </Link>
    //         <Link href="/contact">
    //           <p className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</p>
    //         </Link>
    //       </div>
    //     </div>
    //   )}
    // </nav>
  );
}