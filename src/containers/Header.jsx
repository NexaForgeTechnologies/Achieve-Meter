"use client";
import BtnOne from "../components/BtnOne";
export default function Header() {

    return (
        <>
            <nav className="px-5 sm:px-10 md:px-18 lg:px-20 bg-[#fff9f0] z-50 py-3">
                <div className="py-10 sm:py-15"></div>
                <nav className="flex justify-between items-center px-5 sm:px-10 md:px-18 lg:px-20 bg-[#fff9f0] py-2 fixed top-0 left-0 w-screen ml-[calc(50%-50vw)] z-50">
                    <img src="/logo.png" className="w-25 sm:w-30 md:w-40 h-auto" alt="logo" />

                    <BtnOne
                        name={"Join the Waitlist"}
                        // onClick={() => setIsOpen(!isOpen)} 
                        />
                </nav>
            </nav>
        </>
    );
}