"use client";
import { useEffect, useState } from 'react';
import BtnOne from '../components/BtnOne';
import useFormStore from '@/useFormStore';
import axios from 'axios';

export default function FormApplication() {
  const [formData, setFormData] = useState({
    // Section 1
    membership_type: "",   // "individual" | "business"

    name: "",              // Full Name
    email: "",             // Email Address
    linkedin: "",          // LinkedIn Profile (optional)
    hopes: [],
    early_access: "",      // Yes or NO

    contact_name: "",      // Contact Name
    company_name: "",      // Company Name
    company_size: "",      // Company Size
    business_email: "",    // Business Email
    company_industry: [],  // ✅ must stay array for checkboxes
    interests: [],         // ✅ must stay array for checkboxes
    source: [],            // ✅ must stay array for checkboxes
    source_other: "",
    invite_option: "",     // Invite Option
  });

  // For text, email, radio inputs
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value, // radio handled same as text
    }));
  };

  // For checkboxes (multi-select arrays)
  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      let updatedArray = [...prev[key]];

      if (checked) {
        if (!updatedArray.includes(value)) {
          updatedArray.push(value); // ✅ avoid duplicates
        }
      } else {
        updatedArray = updatedArray.filter((item) => item !== value); // remove
      }

      return { ...prev, [key]: updatedArray };
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post("/api/waitlist", formData);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  const { isOpen, setIsOpen } = useFormStore();

  useEffect(() => {
    isOpen ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "unset"
  }, [isOpen])

  const [membership, setMembership] = useState("individual");
  console.log(membership);

  return (
    <>
      {isOpen && (
        <section className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/80 py-8 md:py-10 overflow-y-auto font-montserrat">
          <form className="flex justify-center items-center"
            onSubmit={handleSubmit} >

            <section className='bg-[#FCF7EE] p-6 rounded-lg shadow-lg border border-[#444444] flex flex-col gap-7
               w-full max-w-6xl relative mx-5'>
              <span className='absolute top-3 right-7 text-2xl text-[#CD8A33] cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}
              >x</span>


              {/* Heading */}
              <section className='flex flex-col items-center gap-y-3 py-5'>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold md:font-normal text-[#1B1B1B] text-center">
                  AchieveMeter
                  <span className='font-bold md:font-semibold ml-1'>
                    Waitlist Form
                  </span>
                </h1>
                {/* <p className='text-sm md:text-base text-[#C2C2C2] text-center'>
                  Join a curated cohort of the world’s most forward-thinking procurement leaders.
                </p> */}
              </section>


              {/* Step 1: Membership Type */}
              <section className='flex flex-col gap-y-2'>
                <h1 className='text-lg lg:text-2xl text-[#CD8A33] font-semibold'>Section 1:
                  <span className='font-normal ml-1'>Who Are You?</span></h1>
                <p className="font-normal text-#1B1B1B text-base md:text-2xl">I’m joining the waitlist as a... (tick one)</p>

                <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="radio"
                        name="membership_type"
                        value="individual"
                        checked={membership === "individual"}
                        onChange={(e) => {
                          setMembership(e.target.value);
                          handleChange(e);
                        }}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        An Individual Procurement Executive
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type='radio'
                        name="membership_type"
                        value="business"
                        checked={membership === "business" || formData.membership_type === "business"}
                        onChange={(e) => {
                          setMembership(e.target.value);
                          handleChange(e);
                        }}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Representing a Business / Organisation
                      </span>
                    </div>
                  </label>
                </div>
              </section>


              {membership === "individual" && (
                <>
                  < section className='flex flex-col gap-y-2'>
                    <h1 className='text-lg lg:text-2xl text-[#CD8A33] font-semibold'>For Individuals
                      {/* <span className='font-normal ml-1'></span> */}
                      </h1>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">

                      {/* Name */}
                      <label className="flex flex-col justify-start gap-y-2">
                        <div>
                          <span className='text-[#1B1B1B] text-base md:text-xl'>
                            Full Name
                          </span>
                        </div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="appearance-none w-full bg-transparent border border-[#444444] rounded-md px-3 py-2 text-[#808080] placeholder-[#808080] focus:outline-none"
                        />
                      </label>


                      {/* Email */}
                      <label className="flex flex-col justify-start gap-y-2">
                        <div>
                          <span className='text-[#1B1B1B] text-base md:text-xl'>
                            Email Address
                          </span>
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="appearance-none w-full bg-transparent border border-[#444444] rounded-md px-3 py-2 text-[#808080] placeholder-[#808080] focus:outline-none"
                        />
                      </label>
                    </div>

                    {/* LinkedIn (optional) */}
                    <label className="flex flex-col justify-start gap-y-2">
                      <div>
                        <span className='text-[#1B1B1B] text-base md:text-xl'>
                          LinkedIn Profile
                        </span>
                      </div>
                      <input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn Profile (optional)"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="appearance-none w-full bg-transparent border border-[#444444] rounded-md px-3 py-2 text-[#808080] placeholder-[#808080] focus:outline-none"
                      />
                    </label>
                  </section>




                  <section className='flex flex-col gap-y-2'>
                    <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">What are you hoping to achieve with AchieveMeter?(Tick all that apply)</p>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Career direction / clarity"
                            checked={formData.hopes.includes("Career direction / clarity")}
                            onChange={(e) => handleCheckboxChange(e, "hopes")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Career direction / clarity
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Promotion readiness"
                            checked={formData.hopes.includes("Promotion readiness")}
                            onChange={(e) => handleCheckboxChange(e, "hopes")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Promotion readiness
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Goal setting and tracking"
                            checked={formData.hopes.includes("Goal setting and tracking")}
                            onChange={(e) => handleCheckboxChange(e, "hopes")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Goal setting and tracking
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Wellbeing and emotional balance"
                            checked={formData.hopes.includes("Wellbeing and emotional balance")}
                            onChange={(e) => handleCheckboxChange(e, "hopes")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Wellbeing and emotional balance
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="External coaching or mentoring"
                            checked={formData.hopes.includes("External coaching or mentoring")}
                            onChange={(e) => handleCheckboxChange(e, "hopes")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            External coaching or mentoring
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Enterprise Transformation Strategy"
                            checked={formData.hopes.includes("Enterprise Transformation Strategy")}
                            onChange={(e) => handleCheckboxChange(e, "hopes")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Enterprise Transformation Strategy
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Personal development bootcamps"
                            checked={formData.hopes.includes("Personal development bootcamps")}
                            onChange={(e) => handleCheckboxChange(e, "hopes")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Personal development bootcamps
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Peer validation and feedback"
                            checked={formData.hopes.includes("Peer validation and feedback")}
                            onChange={(e) => handleCheckboxChange(e, "hopes")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Peer validation and feedback
                          </span>
                        </div>
                      </label>
                    </div>
                  </section>

                  <section className='flex flex-col gap-y-2'>
                    <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">Would you like early access to our AI-led bootcamps?</p>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="radio"
                            name="early_access"
                            value="Yes"
                            checked={formData.early_access === "Yes"}
                            onChange={handleChange}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Yes
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type='radio'
                            name="early_access"
                            value="No"
                            checked={formData.early_access === "No"}
                            onChange={handleChange}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            No
                          </span>
                        </div>
                      </label>
                    </div>
                  </section>
                </>
              )}


              {membership === "business" && (

                <>
                  <section className='flex flex-col gap-y-2'>
                    <h1 className='text-lg lg:text-2xl text-[#CD8A33] font-semibold'>For Business / Enterprise
                      {/* <span className='font-normal ml-1'> (conditional logic: show if “Business” is ticked)</span> */}
                      </h1>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">

                      {/* Name */}
                      <label className="flex flex-col justify-start gap-y-2">
                        <div>
                          <span className='text-[#1B1B1B] text-base md:text-xl'>
                            Contact Name
                          </span>
                        </div>
                        <input
                          type="text"
                          name="contact_name"
                          placeholder="Full Name"
                          value={formData.contact_name}
                          onChange={handleChange}
                          required
                          className="appearance-none w-full bg-transparent border border-[#444444] rounded-md px-3 py-2 text-[#808080] placeholder-[#808080] focus:outline-none"
                        />
                      </label>

                      <label className="flex flex-col justify-start gap-y-2">
                        <div>
                          <span className='text-[#1B1B1B] text-base md:text-xl'>
                            Enter Company Name
                          </span>
                        </div>
                        <input
                          type="text"
                          name="company_name"
                          placeholder="Email Address"
                          value={formData.company_name}
                          onChange={handleChange}
                          required
                          className="appearance-none w-full bg-transparent border border-[#444444] rounded-md px-3 py-2 text-[#808080] placeholder-[#808080] focus:outline-none"
                        />
                      </label>

                    </div>


                    <label className="flex flex-col justify-start gap-y-2">
                      <div>
                        <span className='text-[#1B1B1B] text-base md:text-xl'>
                          Business Email Address
                        </span>
                      </div>
                      <input
                        type="text"
                        name="business_email"
                        placeholder="Enter Business Email Address"
                        value={formData.business_email}
                        onChange={handleChange}
                        className="appearance-none w-full bg-transparent border border-[#444444] rounded-md px-3 py-2 text-[#808080] placeholder-[#808080] focus:outline-none"
                      />
                    </label>
                  </section>

                  <section className='flex flex-col gap-y-2'>
                    <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">Company Size</p>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="radio"
                            name="company_size"
                            value="1–10 employees"
                            checked={formData.company_size === "1–10 employees"}
                            onChange={handleChange}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            1–10 employees
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="radio"
                            name="company_size"
                            value="11–50 employees"
                            checked={formData.company_size === "11–50 employees"}
                            onChange={handleChange}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            11–50 employees
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="radio"
                            name="company_size"
                            value="51–250 employees"
                            checked={formData.company_size === "51–250 employees"}
                            onChange={handleChange}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            51–250 employees
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="radio"
                            name="company_size"
                            value="251–1000 employees"
                            checked={formData.company_size === "251–1000 employees"}
                            onChange={handleChange}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            251–1000 employees
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="radio"
                            name="company_size"
                            value="1000+ employees"
                            checked={formData.company_size === "1000+ employees"}
                            onChange={handleChange}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            1000+ employees
                          </span>
                        </div>
                      </label>
                    </div>
                  </section>


                  <section className='flex flex-col gap-y-2'>
                    <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">
                      What is your current development setup?(Tick all that apply)
                    </p>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="LMS (Learning Management System)"
                            checked={formData.company_industry.includes("LMS (Learning Management System)")}
                            onChange={(e) => handleCheckboxChange(e, "company_industry")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            LMS (Learning Management System)
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="HRIS Platform"
                            checked={formData.company_industry.includes("HRIS Platform")}
                            onChange={(e) => handleCheckboxChange(e, "company_industry")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            HRIS Platform
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Appraisal System"
                            checked={formData.company_industry.includes("Appraisal System")}
                            onChange={(e) => handleCheckboxChange(e, "company_industry")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Appraisal System
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Internal Coaching"
                            checked={formData.company_industry.includes("Internal Coaching")}
                            onChange={(e) => handleCheckboxChange(e, "company_industry")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Internal Coaching
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="None of the above"
                            checked={formData.company_industry.includes("None of the above")}
                            onChange={(e) => handleCheckboxChange(e, "company_industry")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            None of the above
                          </span>
                        </div>
                      </label>
                    </div>
                  </section>



                  <section className='flex flex-col gap-y-2'>
                    <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">
                      What are you interested in?
                    </p>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Demo of AchieveMeter"
                            checked={formData.interests.includes("Demo of AchieveMeter")}
                            onChange={(e) => handleCheckboxChange(e, "interests")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Demo of AchieveMeter
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            value="Joining the enterprise pilot"
                            checked={formData.interests.includes("Joining the enterprise pilot")}
                            onChange={(e) => handleCheckboxChange(e, "interests")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Joining the enterprise pilot
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            name="interests"
                            value="White-labelling options"
                            checked={formData.interests.includes("White-labelling options")}
                            onChange={(e) => handleCheckboxChange(e, "interests")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            White-labelling options
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            name="interests"
                            value="Receiving the enterprise pack"
                            checked={formData.interests.includes("Receiving the enterprise pack")}
                            onChange={(e) => handleCheckboxChange(e, "interests")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Receiving the enterprise pack
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-x-3">
                        <div>
                          <input
                            type="checkbox"
                            name="interests"
                            value="Strategic partnership"
                            checked={formData.interests.includes("Strategic partnership")}
                            onChange={(e) => handleCheckboxChange(e, "interests")}
                            className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                          />
                          <span className='text-[#808080] text-base md:text-lg'>
                            Strategic partnership
                          </span>
                        </div>
                      </label>
                    </div>
                  </section>
                </>
              )}

              {/* Final Confirmation */}
              <section className='flex flex-col gap-y-2'>
                <h1 className='text-lg lg:text-2xl text-[#CD8A33] font-semibold'>
                  Final Section
                  {/* <span className='font-normal ml-1'>(for all)</span> */}
                </h1>
                <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">
                  How did you hear about AchieveMeter?
                </p>

                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-2">

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="LinkedIn"
                      checked={formData.source.includes("LinkedIn")}
                      onChange={(e) => handleCheckboxChange(e, "source")}
                      className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer"
                    />
                    <span className='text-[#808080] text-base md:text-lg'>LinkedIn</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Event or Webinar"
                      checked={formData.source.includes("Event or Webinar")}
                      onChange={(e) => handleCheckboxChange(e, "source")}
                      className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer"
                    />
                    <span className='text-[#808080] text-base md:text-lg'>Event or Webinar</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Newsletter"
                      checked={formData.source.includes("Newsletter")}
                      onChange={(e) => handleCheckboxChange(e, "source")}
                      className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer"
                    />
                    <span className='text-[#808080] text-base md:text-lg'>Newsletter</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Word of mouth"
                      checked={formData.source.includes("Word of mouth")}
                      onChange={(e) => handleCheckboxChange(e, "source")}
                      className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer"
                    />
                    <span className='text-[#808080] text-base md:text-lg'>Word of mouth</span>
                  </label>

                  <label className="flex items-center">
                    <div>
                      <input
                        type="checkbox"
                        value="Other"
                        checked={formData.source.includes("Other")}
                        onChange={(e) => handleCheckboxChange(e, "source")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Other (please specify)
                        <input
                          type="text"
                          value={formData.source_other}
                          onChange={(e) =>
                            setFormData({ ...formData, source_other: e.target.value })
                          }
                          placeholder='_____________'
                          className='pl-2 outline-none border-none bg-transparent' />
                      </span>
                    </div>
                  </label>
                </div>
              </section>

              <section>
                <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">Would you like to receive early product updates and behind-the-scenes content?</p>

                <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="radio"
                        name="invite_option"
                        value="Yes"
                        checked={formData.invite_option === "Yes"}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Yes, keep me updated
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="radio"
                        name="invite_option"
                        value="No"
                        checked={formData.invite_option === "No"}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        No, just notify me when we launch
                      </span>
                    </div>
                  </label>
                </div>
              </section>



              <div className='flex justify-center items-center' >
                <BtnOne typeSubmit={"submit"} name={"Submit Application to Waitlist"} />
              </div>
            </section>
          </form >
        </section >)
      }
    </>
  );
}
