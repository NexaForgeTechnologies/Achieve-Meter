import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-screen ml-[calc(50%-50vw)] flex flex-col justify-between px-5 sm:px-10 md:px-18 lg:px-20 bg-[#FCF7EE] text-white pb-5">

            {/* Top Section */}
            <section className="flex flex-col md:flex-row md:justify-between items-start py-10 w-full gap-3">

                {/* Left: Logo */}
                <div className="flex flex-col justify-center items-start gap-y-3 md:gap-y-5">
                    <img src="logo-lg.png" alt="Xec Plug Logo" className="w-40 lg:w-47" />
                </div>

                {/* Right: Contact List */}
                <div className="w-full md:w-auto md:mx-3">
                    <h1 className="text-lg md:text-xl text-black mb-5">Contact Us</h1>
                    <ul className="grid grid-cols-1 md:grid-cols-2  gap-4">
                        {/* LinkedIn */}
                        <Link
                            href="https://www.linkedin.com/company/achiever-group/about/?viewAsMember=true"
                            target="_blank"
                        >
                            <li className="flex items-center gap-x-2 hover:opacity-80 transition-opacity text-black">
                                <img src="linkedin.png" alt="LinkedIn" className="w-5 h-5" />
                                <span>Achiever Group</span>
                            </li>
                        </Link>

                        {/* Email */}
                        <Link href="mailto:Grow@achiever-grp.com">
                            <li className="flex items-start gap-x-2 hover:opacity-80 transition-opacity text-black">
                                <img src="text.png" alt="Email" className="w-5 h-5" />
                                <u className="break-all">Grow@achiever-grp.com</u>
                            </li>
                        </Link>

                        {/* Location */}
                        <li className="flex items-center gap-x-2 hover:opacity-80 transition-opacity text-black">
                            <img src="location.png" alt="Location" className="w-5 h-auto" />
                            <span>UK</span>
                        </li>

                        {/* Privacy Policy */}
                        <Link
                            href="https://achiever-group-latest-stg.vercel.app/privacypolicy"
                            target="_blank"
                        >
                            <li className="flex items-center gap-x-2 hover:opacity-80 transition-opacity text-black relative -left-1">
                                <img src="privacy.png" alt="Privacy" className="w-7 h-7" />
                                <span>Privacy Policy</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </section>

            {/* Bottom Bar */}
            <section className="py-3 md:py-4 rounded-2xl bg-gradient-to-r from-[#CD8A33] to-[#B58A4C] text-white border-[#444] flex flex-col sm:flex-row justify-center items-center gap-1 text-sm sm:text-base text-center px-3">
                <Link href={"https://achiever-grp.com/"} target="_blank">
                    <span>©2025 Achiever Group |</span>
                </Link>
                <Link href={"https://nexaforgetech.com/"} target="_blank">
                    <span>Powered by NexaForge Technologies</span>
                </Link>
            </section>
        </footer>
    );
}
