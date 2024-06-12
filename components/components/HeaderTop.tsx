"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const HeaderTop = () => {
  const [dateTime, setDateTime] = useState(new Date());

  const { data: session, status } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <div className=" border-b border-gray-200 hidden sm:block">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  py-4">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex gap-1">
            <div className="header_top_icon_wrapper">
              <BsFacebook />
            </div>
            <div className="header_top_icon_wrapper">
              <BsTwitter />
            </div>
            <div className="header_top_icon_wrapper">
              <BsInstagram />
            </div>
            <div className="header_top_icon_wrapper">
              <BsLinkedin />
            </div>
          </div>
          <div className="text-gray-500 text-[16px]">
            {formatDateTime(dateTime)}
          </div>
          <div className="flex gap-4 text-gray-500 text-[16px] navbar__link relative">{JSON.stringify(session?.user?.role)} Page</div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
