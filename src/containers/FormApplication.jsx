"use client";
import { useEffect, useState } from 'react';
import BtnOne from '../components/BtnOne';
import useFormStore from '@/useFormStore';
import axios from 'axios';

export default function FormApplication() {

  const [formData, setFormData] = useState({
    membership_type: "",
    name: "",
    job: "",
    company_name: "",
    email: "",
    linkedin: "",
    country: "",
    interests: [],           // store Step 3 “what attracts you” checkboxes
    membership_options: [],  // store Step 3 “membership type options” checkboxes
    seniority: "",
    goals: "",
    benefits: "",
    source: [],            // array for “How did you hear about us” checkboxes
    source_other: "",      // text for “Other”
    invite_option: ""      // radio yes/no
  }
  );

  // For text, email, radio inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // For checkboxes (multi-select arrays)
  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      let updatedArray = [...prev[key]];

      if (checked) {
        updatedArray.push(value); // add if checked
      } else {
        updatedArray = updatedArray.filter((item) => item !== value); // remove if unchecked
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


  return (
    <>
      {isOpen && (
        <section className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/80 py-8 md:py-10 overflow-y-auto font-montserrat">
          <form className="flex justify-center items-center"
            onSubmit={handleSubmit} >

            <section className='bg-[#FCF7EE] p-6 rounded-lg shadow-lg border border-[#444444] flex flex-col gap-7
               w-full max-w-3xl relative mx-5'>
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
                        checked={formData.membership_type === "individual"}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
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
                        checked={formData.membership_type === "business"}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Representing a Business / Organisation
                      </span>
                    </div>
                  </label>
                </div>
              </section>

              {/* Step 2: About You / Your Organisation */}
              <section className='flex flex-col gap-y-2'>
                <h1 className='text-lg lg:text-2xl text-[#CD8A33] font-semibold'>For Individuals
                  <span className='font-normal ml-1'> (conditional logic: show if “Individual” is ticked)</span></h1>

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



              {/* Step 3: Your Interest in Xec Plug */}
              <section className='flex flex-col gap-y-2'>
                <h1 className='text-lg lg:text-2xl text-[#CD8A33] font-semibold'>Step 3:
                  <span className='font-normal ml-1'>Your Interest in Xec Plug</span></h1>
                <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">What attracts you to the Xec Plug platform? (Select all that apply)</p>

                <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Boardroom Readiness"
                        checked={formData.interests.includes("Boardroom Readiness")}
                        onChange={(e) => handleCheckboxChange(e, "interests")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Boardroom Readiness
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Representing a Business / Organisation"
                        checked={formData.interests.includes("Representing a Business / Organisation")}
                        onChange={(e) => handleCheckboxChange(e, "interests")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Representing a Business / Organisation
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Proprietary Leadership Tools (XecAchieve, XecXchange, etc.)"
                        checked={formData.interests.includes("Proprietary Leadership Tools (XecAchieve, XecXchange, etc.)")}
                        onChange={(e) => handleCheckboxChange(e, "interests")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Proprietary Leadership Tools (XecAchieve, XecXchange, etc.)
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Executive Retreats & In-Person Events"
                        checked={formData.interests.includes("Executive Retreats & In-Person Events")}
                        onChange={(e) => handleCheckboxChange(e, "interests")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Executive Retreats & In-Person Events
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Virtual Masterclasses & On-Demand Learning"
                        checked={formData.interests.includes("Virtual Masterclasses & On-Demand Learning")}
                        onChange={(e) => handleCheckboxChange(e, "interests")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Virtual Masterclasses & On-Demand Learning
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Enterprise Transformation Strategy"
                        checked={formData.interests.includes("Enterprise Transformation Strategy")}
                        onChange={(e) => handleCheckboxChange(e, "interests")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
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
                        value="Coaching & Concierge Support"
                        checked={formData.interests.includes("Coaching & Concierge Support")}
                        onChange={(e) => handleCheckboxChange(e, "interests")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Coaching & Concierge Support
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Other"
                        checked={formData.interests.includes("Other")}
                        onChange={(e) => handleCheckboxChange(e, "interests")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Other (please specify):
                        <input
                          type="text"
                          value={formData.other_interest || ""}
                          onChange={(e) => setFormData({ ...formData, other_interest: e.target.value })}
                          placeholder='_____________'
                          className='pl-2 outline-none border-none bg-transparent' />
                      </span>
                    </div>
                  </label>
                </div>
              </section>

              <section>
                <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">What attracts you to the Xec Plug platform? (Select all that apply)</p>

                <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Digital Membership (virtual access)"
                        checked={formData.membership_options.includes("Digital Membership (virtual access)")}
                        onChange={(e) => handleCheckboxChange(e, "membership_options")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Digital Membership (virtual access)
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Xec House Membership (in-person access)"
                        checked={formData.membership_options.includes("Xec House Membership (in-person access)")}
                        onChange={(e) => handleCheckboxChange(e, "membership_options")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#C2C2C2] text-base md:text-lg'>
                        Xec House Membership (in-person access)
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Not sure yet – I’d like to explore options"
                        checked={formData.membership_options.includes("Not sure yet – I’d like to explore options")}
                        onChange={(e) => handleCheckboxChange(e, "membership_options")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#C2C2C2] text-base md:text-lg'>
                        Not sure yet – I’d like to explore options
                      </span>
                    </div>
                  </label>
                </div>
              </section>


              {/* Step 4: Vision & Fit */}
              <section className='flex flex-col gap-y-2'>
                <h1 className='text-lg lg:text-2xl text-[#CD8A33] font-semibold'>Step 4:
                  <span className='font-normal ml-1'>Step 4: Vision & Fit</span></h1>
                <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">What is your current level of seniority?</p>

                <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="radio"
                        name="seniority"
                        value="CPO"
                        checked={formData.seniority === "CPO"}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        CPO
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="radio"
                        name="seniority"
                        value="Director / Head of Procurement"
                        checked={formData.seniority === "Director / Head of Procurement"}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Director / Head of Procurement
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="radio"
                        name="seniority"
                        value="VP / AVP"
                        checked={formData.seniority === "VP / AVP"}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        VP / AVP
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="radio"
                        name="seniority"
                        value="Executive / NED"
                        checked={formData.seniority === "Executive / NED"}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Executive / NED
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="radio"
                        name="seniority"
                        value="Other"
                        checked={formData.seniority === "Other"}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Other:
                        <input
                          type="text"
                          value={formData.seniority_other}
                          onChange={(e) => setFormData({ ...formData, seniority_other: e.target.value })}
                          placeholder='_____________'
                          className='pl-2 outline-none border-none bg-transparent' />
                      </span>
                    </div>
                  </label>
                </div>

                <div className='flex flex-col gap-y-3 mt-2'>
                  <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">What are your next leadership goals (e.g., COO, CEO, NED, transformation lead)? </p>
                  <textarea
                    value={formData.goals}
                    onChange={handleChange}
                    name="goals"
                    rows="4"
                    placeholder='Write your answer'
                    className="w-full bg-transparent text-[#808080] border border-[#C2C2C2]/50 min-h-30 outline-none rounded p-2"></textarea>
                </div>

                <div className='flex flex-col gap-y-3 mt-2'>
                  <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">What would you hope to gain from being part of the founding cohort?</p>
                  <textarea
                    value={formData.benefits}
                    onChange={handleChange}
                    name="benefits"
                    rows="4"
                    placeholder='Write your answer'
                    className="w-full bg-transparent text-[#808080] border border-[#C2C2C2]/50 min-h-30 outline-none rounded p-2"></textarea>
                </div>

              </section>

              {/* Step 5: Final Confirmation */}
              <section className='flex flex-col gap-y-2'>
                <h1 className='text-lg lg:text-2xl text-[#CD8A33] font-semibold'>Step 5:
                  <span className='font-normal ml-1'>Final Confirmation</span></h1>
                <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">How did you hear about The Procurement Xec Plug?</p>

                <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        name='linkedin'
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        LinkedIn
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Referral"
                        checked={formData.source.includes("Referral")}
                        onChange={(e) => handleCheckboxChange(e, "source")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Referral
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Procurement Plug Ecosystem"
                        checked={formData.source.includes("Procurement Plug Ecosystem")}
                        onChange={(e) => handleCheckboxChange(e, "source")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Procurement Plug Ecosystem
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Event or Webinar"
                        checked={formData.source.includes("Event or Webinar")}
                        onChange={(e) => handleCheckboxChange(e, "source")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Event or Webinar
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="checkbox"
                        value="Other"
                        checked={formData.source.includes("Other")}
                        onChange={(e) => handleCheckboxChange(e, "source")}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Other:
                        <input type="text"
                          value={formData.source_other}
                          onChange={(e) => setFormData({ ...formData, source_other: e.target.value })}
                          placeholder='_____________'
                          className='pl-2 outline-none border-none bg-transparent' />
                      </span>
                    </div>
                  </label>
                </div>
              </section>

              <section>
                <p className="font-normal text-[#1B1B1B] text-base md:text-2xl">Would you like to be added to our updates and exclusive invite list?</p>

                <div className="space-y-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <label className="flex items-start gap-x-3">
                    <div>
                      <input
                        type="radio"
                        name="invite_option"
                        value="Yes"
                        checked={formData.invite_option === "Yes"}
                        onChange={handleChange}
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        Yes, keep me informed
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
                        className="appearance-none w-4 h-4 rounded border border-gray-400 checked:bg-[white] checked:border-[white] mr-2 cursor-pointer "
                      />
                      <span className='text-[#808080] text-base md:text-lg'>
                        No, just waitlist me for now
                      </span>
                    </div>
                  </label>
                </div>
              </section>



              <div className='flex justify-center items-center' >
                <BtnOne typeSubmit={"submit"} name={"Submit Application to Waitlist"} />
              </div>
            </section>
          </form>
        </section>)}
    </>
  );
}
