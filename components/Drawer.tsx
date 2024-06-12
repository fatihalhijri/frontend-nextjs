"use client";
import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useSpring, animated } from "@react-spring/web";
import Button from "./Button";
import { TrashIcon, XIcon } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  children: ReactNode;
  title: string;
  onSubmit: () => void;
  onClear: () => void;
  onClose: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  title,
  children,
  onSubmit,
  onClear,
  onClose,
}) => {
  const springs = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    to: { opacity: isOpen ? 1 : 0, transform: isOpen ? "translateX(0)" : "translateX(100%)" },
  });

  return (
    <animated.div
      style={{
        height: "100vh",
        right: 0,
        top: 0,
        position: "fixed", // Use fixed position to prevent scroll
        zIndex: 50,
        ...springs,
      }}
      className="shadow-lg  z-50 md:w-[50%] lg:w-[30%] xl:w-[25%] w-full bg-white border border-gray-200 flex flex-col"
    >
      <section className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h5 className="text-gray-700 text-lg font-bold">{title}</h5>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              onClear();
              onClose();
            }}
            className="text-gray-500 hover:text-red-500 transition-colors duration-200"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      </section>
      <section className="flex-1 overflow-y-auto p-5">{children}</section>
      <section className="px-5 py-8 pb-10 border-t border-gray-100">
        <Button
          onClick={() => {
            onSubmit();
            onClose();
          }}
          title="Terapkan"
          colorSchema="blue"
        />
      </section>
    </animated.div>
  );
};
