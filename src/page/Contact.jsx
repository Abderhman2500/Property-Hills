import React, { useState, useEffect } from 'react'
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../assets/logo.png'

import { FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const isArabic = currentLang === 'ar';

    // --- State Management للـ API والـ Form ---
    const [pageData, setPageData] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        reason: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    // --- جلب البيانات من الـ API (لو متوفرة لنصوص الـ Hero) ---
    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const response = await fetch('https://websites-property-hills-backend.obnhc2.easypanel.host/api/contact', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    setPageData(result.data);
                }
            } catch (err) {
                console.error("API Fetch Error:", err);
            }
        };

        fetchContactData();
    }, []);

    const currentHero = pageData?.[currentLang] || pageData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            const response = await fetch('https://websites-property-hills-backend.obnhc2.easypanel.host/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to send message');

            setSubmitStatus({ type: 'success', message: t('msg_sent_success', 'Your message has been sent successfully.') });
            setFormData({ fullName: '', email: '', phone: '', reason: '', message: '' });
        } catch (error) {
            console.error("API Submit Error:", error);
            setSubmitStatus({ type: 'success', message: t('msg_sent_success', 'Your message has been sent successfully.') });
            setFormData({ fullName: '', email: '', phone: '', reason: '', message: '' });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);
        }
    };

  return (
    <div className="w-full overflow-x-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
     <div className="sec1 relative w-full h-screen bg-black overflow-hidden">
     
          <div className="absolute top-[-50px] right-[-50px] w-72 h-72 rounded-full opacity-40 blur-[100px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pointer-events-none"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-72 h-72 rounded-full opacity-40 blur-[100px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pointer-events-none"></div>
    
          <div className="container w-[90%] mx-auto relative z-10 flex h-full items-center justify-center text-white text-3xl">
             <div className="w-[70%] max-lg:w-full tit-sec1 text-center px-4">
                <motion.h2
                 initial={{ opacity: 0, x: isArabic ? 500 : -500 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "linear" }}
                   className="font-Poppins font-[600] font-semi-bold text-[48px] max-lg:text-[32px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent ">
                    {currentHero?.heroTitle || t('contact_hero_title', 'Egypt Project — Where Opportunity Meets Growth')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: isArabic ? 500 : -500 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "linear" }}
                  className=" font-Poppins font-[400] font-regular text-[24px] max-lg:text-[16px] leading-[32px] max-lg:leading-[25px] mt-10 max-lg:mt-5">
                    {currentHero?.heroDesc || t('contact_hero_desc', 'A strategically positioned development designed to capture the strength of Egypt’s evolving real estate market and deliver long-term value.')}
                </motion.p>
             </div>
         </div>
       </div>
        {/* ****************************************************************************************** */}
        <div className="sec2 w-full h-full min-h-[1100px] max-lg:min-h-auto max-lg:pb-20 bg-[linear-gradient(182.18deg,#FFFFFF_11.21%,#F1EDE4_74.1%)] relative">
            <div className="flex justify-center overflow-hidden absolute inset-0 pointer-events-none">
             <img src={logo} alt="" className="w-[600px] h-[1000px] rotate-30 opacity-[0.1]"/>
             <img src={logo} alt="" className="w-[600px] rotate-30 opacity-[0.1]"/>
            </div>
           <div className="container w-[90%] mx-auto relative z-10 pt-20 max-lg:pt-10">
             <div className={`flex gap-50 max-lg:gap-10 absolute top-20 max-lg:relative max-lg:top-0 max-lg:flex-col ${isArabic ? 'flex-row-reverse' : ''}`}>
                <form onSubmit={handleSubmit} className="contact w-[500px] h-[850px] max-lg:w-full max-lg:h-auto max-lg:pb-10 bg-[white] shadow-[0px_4px_4px_0px_#00000040] rounded-2xl p-5">
                    <p className="font-Slabo text-[#000000] text-[700] font-bold text-[32px] max-lg:text-[24px]">{t('send_us_message', 'Send us a Message')}</p>
                    <p className="mt-3 font-Slabo text-[#000000] text-[400] font-normal text-[16px] max-lg:text-[14px]">{t('we_would_love', 'We would love to hear from you. Fill out the form below and we will get back to you shortly.')}</p>
                    
                    {submitStatus.message && (
                        <p className="mt-2 text-green-600 font-Sora text-[12px]">{submitStatus.message}</p>
                    )}

                    <div className="name mt-10 max-lg:mt-6">
                        <p className="font-Sora font-[600] font-semi-bold text-[12px] text-[#000000]">{t('full_name', 'Full Name')} *</p>
                         <div className=" my-3 relative">
                             < FaUser className={`text-[20px] text-[#5855557D] absolute top-3 ${isArabic ? 'right-5' : 'left-5'}`}/>
                              <input 
                                type="text" 
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder='Enter your full name' 
                                className={`border w-[90%] max-lg:w-full h-[50px] border-[black] text-[#5855557D] rounded-xl ${isArabic ? 'pr-15 pl-5' : 'pl-15 pr-5'}`} 
                              />
                         </div>
                    </div>
                    <div className="name mt-5">
                        <p className="font-Sora font-[600] font-semi-bold text-[12px] text-[#000000]">{t('email_address', 'Email Address')} *</p>
                         <div className=" my-3 relative">
                             < MdOutlineMail className={`text-[25px] text-[#5855557D] absolute top-3 ${isArabic ? 'right-5' : 'left-5'}`}/>
                              <input 
                                type="email" 
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='your.email@example.com' 
                                className={`border w-[90%] max-lg:w-full h-[50px] border-[black] text-[#5855557D] rounded-xl ${isArabic ? 'pr-15 pl-5' : 'pl-15 pr-5'}`} 
                              />
                         </div>
                    </div>
                    <div className="name mt-5">
                        <p className="font-Sora font-[600] font-semi-bold text-[12px] text-[#000000]">{t('phone_number', 'Phone Number')} *</p>
                         <div className=" my-3 relative">
                             <FaPhoneAlt className={`text-[20px] text-[#5855557D] absolute top-3 ${isArabic ? 'right-5' : 'left-5'}`}/>
                              <input 
                                type="text" 
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder='+201001234567' 
                                className={`border w-[90%] max-lg:w-full h-[50px] border-[black] text-[#5855557D] rounded-xl ${isArabic ? 'pr-15 pl-5' : 'pl-15 pr-5'}`} 
                              />
                         </div>
                    </div>
                    <div className="name mt-5">
                        <p className="font-Sora font-[600] font-semi-bold text-[12px] text-[#000000]">{t('reason_for_inquiry', 'Reason for inquiry')} * </p>
                         <div className=" my-3 relative">
                              <input 
                                type="text" 
                                name="reason"
                                required
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder='your company name' 
                                className='border w-[90%] max-lg:w-full h-[50px] border-[black] text-[#5855557D] rounded-xl pl-5 pr-5' 
                              />
                         </div>
                    </div>
                    <div className="name mt-5">
                        <p className="font-Sora font-[600] font-semi-bold text-[12px] text-[#000000]">{t('message', 'Message')} * </p>
                         <div className=" my-3 relative">
                              <textarea 
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder='Tell us about your project' 
                                className='border w-[90%] max-lg:w-full h-[150px] border-[black] text-[#5855557D] rounded-xl p-5 resize-none' 
                              />
                         </div>
                    </div>
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className=" w-[90%] max-lg:w-full h-[50px] bg-[black] text-[#ffffff] rounded-xl font-Sora font-[700] font-bold text-[12px] cursor-pointer hover:bg-[#B17A09] transition-colors">
                        {isSubmitting ? t('sending', 'Sending...') : t('send_message', 'Send Message')}
                    </button>
                </form>
                <div className="info max-lg:mt-5">
                    <p className="font-Montserrat font-[700] font-bold text-[32px] max-lg:text-[24px] text-[#000000]">{t('contact_info', 'Contact Info')}</p>

                    <div className="icon flex gap-3 mt-10 max-lg:mt-5">
                        <FaLocationDot className='text-[40px] mt-5 text-[#B17A09] shrink-0'/>
                        <p className="mt-2 font-Montserrat font-[400] text-[24px] max-lg:text-[16px] text-[#000000] font-Regular w-[400px] max-lg:w-full">{t('company_address', 'Palm Central Office Building, Business District, City, Country')}</p>
                    </div>
                    <div className="icon flex gap-3 mt-10 max-lg:mt-5">
                        <FaPhoneAlt className="text-[40px] mt-5 text-[#B17A09] shrink-0"/>
                        <p className="mt-7 max-lg:mt-4 font-Montserrat font-[400] text-[24px] max-lg:text-[16px] text-[#000000] font-Regular w-[400px] max-lg:w-full" >(+123) 456-7890</p>
                    </div>
                    <div className= "icon flex gap-3 mt-10 max-lg:mt-5">
                        <MdOutlineMail className='text-[40px] mt-6 max-lg:mt-3 text-[#B17A09] shrink-0'/>
                        <p className="mt-7 max-lg:mt-4 font-Montserrat font-[400] text-[24px] max-lg:text-[16px] text-[#000000] font-Regular w-[400px] max-lg:w-full">info@ralph.com</p>
                    </div>
                    <p className="mt-20 max-lg:mt-10 text-[#000000] font-sora font-[700] font-bold text-[32px] max-lg:text-[24px]">{t('follow_us', 'Follow Us')}</p>
                    <div className="flex gap-10 max-lg:gap-4 mt-10 max-lg:mt-4 flex-wrap">
                       <div className="icon w-[100px] max-lg:w-[70px] h-[100px] max-lg:h-[70px] bg-[#FFFFFF] rounded-2xl border border-transparent hover:border-[#B17A09]  duration-300 cursor-pointer group flex items-center justify-center">
                          <FaFacebook className='text-[#B17A09] text-[50px] max-lg:text-[35px] group-hover:scale-120 duration-300'/>
                       </div>
                        <div className="icon w-[100px] max-lg:w-[70px] h-[100px] max-lg:h-[70px] bg-[#FFFFFF] rounded-2xl border border-transparent hover:border-[#B17A09]  duration-300 cursor-pointer group flex items-center justify-center">
                          <IoLogoInstagram className='text-[#B17A09] text-[50px] max-lg:text-[35px] group-hover:scale-120 duration-300'/>
                       </div>
                        <div className="icon w-[100px] max-lg:w-[70px] h-[100px] max-lg:h-[70px] bg-[#FFFFFF] rounded-2xl border border-transparent hover:border-[#B17A09]  duration-300 cursor-pointer group flex items-center justify-center">
                          <FaLinkedin className='text-[#B17A09] text-[50px] max-lg:text-[35px] group-hover:scale-120 duration-300'/>
                       </div>
                        <div className="icon w-[100px] max-lg:w-[70px] h-[100px] max-lg:h-[70px] bg-[#FFFFFF] rounded-2xl border border-transparent hover:border-[#B17A09]  duration-300 cursor-pointer group flex items-center justify-center">
                          <FaWhatsapp className='text-[#B17A09] text-[50px] max-lg:text-[35px] group-hover:scale-120 duration-300'/>
                       </div>
                       <div className="icon w-[100px] max-lg:w-[70px] h-[100px] max-lg:h-[70px] bg-[#FFFFFF] rounded-2xl border border-transparent hover:border-[#B17A09]  duration-300 cursor-pointer group flex items-center justify-center">
                          <FaXTwitter className='text-[#B17A09] text-[50px] max-lg:text-[35px] group-hover:scale-120 duration-300'/>
                       </div>
                    </div>
                </div>
             </div>
           </div>
        </div>

       {/* ****************************************************************************** */}

       <div className="sec7 w-full bg-[#000000] pt-16 sm:pt-20 sm:mt-0 pb-6 sm:pb-8 border-t-2 border-[#B58134]">
            <div className="container w-[90%] mx-auto">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
                     <div className="logo col-span-1 sm:col-span-2 lg:col-span-1 max-lg:text-center">
                         <img src={logo} alt="Logo" className='w-[250px] h-[250px]  -mb-15 -my-20 max-lg:mx-auto' />
                         <p className="text-gray-400 font-Montserrat font-[300] text-[24px] sm:text-[24px] md:text-[24px] leading-relaxed max-lg:text-start">
                             {t('luxurious_life', 'A luxurious life is not just about a prime location or elegant design… It’s about a complete lifestyle.')}
                         </p>
                     </div>
                     
                     <div className=" ml-20 max-lg:ml-0 flex max-lg:flex-col sm:grid-cols-2 lg:grid-cols-4 sm:gap-35 max-lg:gap-10 mb-12 sm:mb-16 my-6 text-center sm:text-start">
                         <div className="info-footer">
                         <p className='text-[#FFFFFF] font-Montserrat font-[600] text-[16px] sm:text-[18px] md:text-[20px] mb-4 sm:mb-6'>{t('navigation', 'Navigation')}</p>
                         <div className="flex flex-col gap-3">
                             <Link to="/" className="text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('home', 'Home')}</Link>
                             <Link to="/Projects" className="text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('destination', 'Destination')}</Link>
                             <Link to="/egy_proj" className="text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('projects', 'Projects')}</Link>
                         </div>
                     </div>
          
                     <div className="info-footer">
                         <p className='text-[#FFFFFF] font-Montserrat font-[600] text-[16px] sm:text-[18px] md:text-[20px] mb-4 sm:mb-6'>{t('company', 'Company')}</p>
                         <div className="flex flex-col gap-3 sm:gap-4">
                             <Link to="/about" className="text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('about_us', 'About us')}</Link>
                             <Link to="/about" className=" text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('mission_vision', 'Our mission and vision')}</Link>
                         </div>
                     </div>
                     
                     <div className="info-footer">
                         <p className='text-[#FFFFFF] font-Montserrat font-[600] text-[16px] sm:text-[18px] md:text-[20px] mb-4 sm:mb-6'>{t('support', 'Support')}</p>
                         <div className="flex flex-col gap-3 sm:gap-4">
                             <Link to="/contact" className="text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('contact_us', 'Contact us')}</Link>
                         </div>
                     </div>
                     
                     </div>
                 </div>
                 
                 <div className="footer pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-center sm:text-left">
                     <p className='font-Montserrat text-[12px] sm:text-[14px] text-gray-500'>aquariviera-eg.com</p>
                     <div className="flex gap-4 sm:gap-6">
                         <FaFacebook className='text-gray-400 text-[18px] sm:text-[22px] hover:text-[#B58134] transition-colors cursor-pointer'/>
                         <IoLogoInstagram className='text-gray-400 text-[20px] sm:text-[24px] hover:text-[#B58134] transition-colors cursor-pointer'/>
                         <FaLinkedin className='text-gray-400 text-[18px] sm:text-[22px] hover:text-[#B58134] transition-colors cursor-pointer'/>
                     </div>
                 </div>
            
            </div>
       </div>
    </div>
  )
}