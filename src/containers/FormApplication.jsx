"use client";
import { useEffect, useState } from 'react';
import BtnOne from '../components/BtnOne';
import useFormStore from '@/useFormStore';
import axios from 'axios';

export default function FormApplication() {
  // ---------------- STATES ----------------
  const [individual, setIndividual] = useState({
    membership_type: "individual",

    // Individual fields
    name: "",
    email: "",
    linkedin: "",
    hopes: [],
    early_access: "",

    // Shared fields
    source: [],
    source_other: "",
    invite_option: "",
  });

  const [business, setBusiness] = useState({
    membership_type: "business",

    // Business fields
    contact_name: "",
    company_name: "",
    company_size: "",
    business_email: "",
    company_industry: [],
    interests: [],

    // Shared fields
    source: [],
    source_other: "",
    invite_option: "",
  });

  // ---------------- HANDLERS ----------------
  // For text, email, radio inputs
  const handleChange = (e, type = "individual") => {
    const { name, value } = e.target;
    if (type === "individual") {
      setIndividual((prev) => ({ ...prev, [name]: value }));
    } else {
      setBusiness((prev) => ({ ...prev, [name]: value }));
    }
  };

  // For checkboxes (multi-select arrays)
  const handleCheckboxChange = (e, key, type = "individual") => {
    const { value, checked } = e.target;
    const updater = (prev) => {
      let updatedArray = [...prev[key]];
      if (checked && !updatedArray.includes(value)) {
        updatedArray.push(value);
      } else if (!checked) {
        updatedArray = updatedArray.filter((item) => item !== value);
      }
      return { ...prev, [key]: updatedArray };
    };

    if (type === "individual") {
      setIndividual(updater);
    } else {
      setBusiness(updater);
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e, type = "individual") => {
    e.preventDefault();
    console.log(individual);
    console.log(business);
    try {
      if (type === "individual") {
        console.log("Submitting Individual:", individual);
        const res = await axios.post("/api/waitlist", individual);
        alert(res.data.message);
      } else {
        console.log("Submitting Business:", business);
        const res = await axios.post("/api/waitlist", business);
        alert(res.data.message);
      }
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
                        checked={membership === "business"}
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
                          value={individual.name}
                          onChange={(e) => handleChange(e, "individual")}
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
                          value={individual.email}
                          onChange={(e) => handleChange(e, "individual")}
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
                        value={individual.linkedin}
                        onChange={(e) => handleChange(e, "individual")}
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
                            checked={individual.hopes.includes("Career direction / clarity")}
                            onChange={(e) => handleCheckboxChange(e, "hopes", "individual")}
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
                            checked={individual.hopes.includes("Promotion readiness")}
                            onChange={(e) => handleCheckboxChange(e, "hopes", "individual")}
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
                            checked={individual.hopes.includes("Goal setting and tracking")}
                            onChange={(e) => handleCheckboxChange(e, "hopes", "individual")}
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
                            checked={individual.hopes.includes("Wellbeing and emotional balance")}
                            onChange={(e) => handleCheckboxChange(e, "hopes", "individual")}
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
                            checked={individual.hopes.includes("External coaching or mentoring")}
                            onChange={(e) => handleCheckboxChange(e, "hopes", "individual")}
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
                            checked={individual.hopes.includes("Enterprise Transformation Strategy")}
                            onChange={(e) => handleCheckboxChange(e, "hopes", "individual")}
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
                            checked={individual.hopes.includes("Personal development bootcamps")}
                            onChange={(e) => handleCheckboxChange(e, "hopes", "individual")}
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
                            checked={individual.hopes.includes("Peer validation and feedback")}
                            onChange={(e) => handleCheckboxChange(e, "hopes", "individual")}
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
                            checked={individual.early_access === "Yes"}
                            onChange={(e) => handleChange(e, "individual")}
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
                            checked={individual.early_access === "No"}
                            onChange={(e) => handleChange(e, "individual")}
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
                    <h1 className='text-lg lg:text-2xl text-[#CD8A33] font-semibold'>For Business / Enterprise</h1>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">

                      {/* Contact Name */}
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
                          value={business.contact_name}
                          onChange={(e) => handleChange(e, "business")}
                          required
                          className="appearance-none w-full bg-transparent border border-[#444444] rounded-md px-3 py-2 text-[#808080] placeholder-[#808080] focus:outline-none"
                        />
                      </label>

                      {/* Company Name */}
                      <label className="flex flex-col justify-start gap-y-2">
                        <div>
                          <span className='text-[#1B1B1B] text-base md:text-xl'>
                            Enter Company Name
                          </span>
                        </div>
                        <input
                          type="text"
                          name="company_name"
                          placeholder="Company Name"
                          value={business.company_name}
                          onChange={(e) => handleChange(e, "business")}
                          required
                          className="appearance-none w-full bg-transparent border border-[#444444] rounded-md px-3 py-2 text-[#808080] placeholder-[#808080] focus:outline-none"
                        />
                      </label>

                    </div>

                    {/* Business Email */}
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
                        value={business.business_email}
                        onChange={(e) => handleChange(e, "business")}
                        required
                        className="appearance-none w-full bg-transparent border border-[#444444] rounded-md px-3 py-2 text-[#808080] placeholder-[#808080] focus:outline-none"
                      />
                    </label>
                  </section>

                  {/* Company Size */}
                  <section className='flex flex-col gap-y-2'>
                    <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">Company Size</p>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                      {["1–10 employees", "11–50 employees", "51–250 employees", "251–1000 employees", "1000+ employees"].map(size => (
                        <label key={size} className="flex items-start gap-x-3">
                          <div>
                            <input
                              type="radio"
                              name="company_size"
                              value={size}
                              checked={business.company_size === size}
                              onChange={(e) => handleChange(e, "business")}
                              required
                              className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                            />
                            <span className='text-[#808080] text-base md:text-lg'>
                              {size}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>

                  {/* Development Setup */}
                  <section className='flex flex-col gap-y-2'>
                    <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">
                      What is your current development setup?(Tick all that apply)
                    </p>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                      {[
                        "LMS (Learning Management System)",
                        "HRIS Platform",
                        "Appraisal System",
                        "Internal Coaching",
                        "None of the above"
                      ].map(option => (
                        <label key={option} className="flex items-start gap-x-3">
                          <div>
                            <input
                              type="checkbox"
                              value={option}
                              checked={business.company_industry.includes(option)}
                              onChange={(e) => handleCheckboxChange(e, "company_industry", "business")}
                              className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                            />
                            <span className='text-[#808080] text-base md:text-lg'>
                              {option}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>

                  {/* Interests */}
                  <section className='flex flex-col gap-y-2'>
                    <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">
                      What are you interested in?
                    </p>

                    <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                      {[
                        "Demo of AchieveMeter",
                        "Joining the enterprise pilot",
                        "White-labelling options",
                        "Receiving the enterprise pack",
                        "Strategic partnership"
                      ].map(option => (
                        <label key={option} className="flex items-start gap-x-3">
                          <div>
                            <input
                              type="checkbox"
                              value={option}
                              checked={business.interests.includes(option)}
                              onChange={(e) => handleCheckboxChange(e, "interests", "business")}
                              className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                            />
                            <span className='text-[#808080] text-base md:text-lg'>
                              {option}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>
                </>
              )}
              {/* Final Confirmation */}
              <section className='flex flex-col gap-y-2'>
                <h1 className='text-lg lg:text-2xl text-[#CD8A33] font-semibold'>
                  Final Section
                </h1>
                <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">
                  How did you hear about AchieveMeter?
                </p>

                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-2">
                  {["LinkedIn", "Event or Webinar", "Newsletter", "Word of mouth"].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        value={option}
                        checked={
                          membership === "individual"
                            ? individual.source.includes(option)
                            : business.source.includes(option)
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            e,
                            "source",
                            membership === "individual" ? "individual" : "business"
                          )
                        }
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer"
                      />
                      <span className='text-[#808080] text-base md:text-lg'>{option}</span>
                    </label>
                  ))}

                  <label className="flex items-center">
                    <div>
                      <input
                        type="checkbox"
                        value="Other"
                        checked={
                          membership === "individual"
                            ? individual.source.includes("Other")
                            : business.source.includes("Other")
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            e,
                            "source",
                            membership === "individual" ? "individual" : "business"
                          )
                        }
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[black] checked:border-[black] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Other (please specify)
                        <input
                          type="text"
                          value={
                            membership === "individual"
                              ? individual.source_other
                              : business.source_other
                          }
                          onChange={(e) =>
                            membership === "individual"
                              ? setIndividual({ ...individual, source_other: e.target.value })
                              : setBusiness({ ...business, source_other: e.target.value })
                          }
                          placeholder='_____________'
                          className='pl-2 outline-none border-none bg-transparent'
                        />
                      </span>
                    </div>
                  </label>
                </div>
              </section>

              <section>
                <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">
                  Would you like to receive early product updates and behind-the-scenes content?
                </p>

                <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="radio"
                        name="invite_option"
                        value="Yes"
                        checked={
                          membership === "individual"
                            ? individual.invite_option === "Yes"
                            : business.invite_option === "Yes"
                        }
                        onChange={(e) =>
                          handleChange(e, membership === "individual" ? "individual" : "business")
                        }
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
                        checked={
                          membership === "individual"
                            ? individual.invite_option === "No"
                            : business.invite_option === "No"
                        }
                        onChange={(e) =>
                          handleChange(e, membership === "individual" ? "individual" : "business")
                        }
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
