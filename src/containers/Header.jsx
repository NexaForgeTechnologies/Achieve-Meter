"use client";
import { useEffect, useState } from "react";
import BtnOne from "../components/BtnOne";
import useFormStore from "../useFormStore";
import Link from "next/link";

export default function Header() {
  const { isOpen, setIsOpen } = useFormStore();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex justify-between items-center px-5 sm:px-10 md:px-18 bg-[#FCF7EE] py-2 shadow duration-300 w-screen ml-[calc(50%-50vw)] ${isFixed ? "fixed top-0 left-0 z-50" : "relative"
        }`}
    >
      <Link href={"/"}>
        <img src="/logo.png" className="w-25 sm:w-30 h-auto" alt="logo" />
      </Link>

      <div className="flex gap-x-1 sm:gap-x-2 md:gap-x-4">
        <span >
          <Link href={"/investors"}>
            <BtnOne
              name={"Investors"}
            />
          </Link>
        </span>

        <BtnOne
          name={"Join the Waitlist"}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </nav>
  );
}
