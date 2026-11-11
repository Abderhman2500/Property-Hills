import React, { useState, useEffect } from 'react'
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../assets/logo.png'
import img1 from '../assets/proj1.png'
import img11 from '../assets/proj11.png'
import img111 from '../assets/proj111.png'

import img2 from '../assets/proj2.png'
import img22 from '../assets/proj22.png'
import img222 from '../assets/proj222.png'

import { CiLocationOn } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";

// --- دالة تحويل الأرقام الإنجليزية إلى عربية ---
const formatNumber = (num, isArabic) => {
    if (!num) return num;
    if (isArabic) {
        return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    }
    return num;
};

export default function Projects() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const isArabic = currentLang === 'ar';

    // تم تعديل projectsCount ليكون count كرقم لسهولة تحويله للعربي
    const regionProjectsData = [
        { id: 1, image: img1, location: "Egypt .new Cairo", count: 12, link: "/egy_proj", overlayColor: "bg-black/20" },
        { id: 2, image: img11, location: "Egypt .new Cairo", count: 12, link: "/egy_proj", overlayColor: "bg-black/20" },
        { id: 3, image: img111, location: "Egypt .new Cairo", count: 12, link: "/egy_proj", overlayColor: "bg-black/20" },
    ];
    
    const regionProjectsData2 = [
        { id: 1, image: img2, location: "Egypt .new Cairo", count: 12, link: "/egy_proj", overlayColor: "bg-black/20" },
        { id: 2, image: img222, location: "Egypt .new Cairo", count: 12, link: "/egy_proj", overlayColor: "bg-black/20" },
        { id: 3, image: img111, location: "Egypt .new Cairo", count: 12, link: "/egy_proj", overlayColor: "bg-black/20" },
    ];

    const [projects, setProjects] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- جلب البيانات من الـ API مرة واحدة فقط ---
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://websites-property-hills-backend.obnhc2.easypanel.host/api/projects', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }

                const result = await response.json();
                setProjects(result.data);
                setIsLoading(false);
            } catch (err) {
                console.error("API Error:", err);
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="w-full overflow-x-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
            
            {/* ======================= SEC 1 (Hero) ======================= */}
            <div className="sec1 relative w-full h-screen bg-black overflow-hidden">
                <div className="absolute top-[-50px] right-[-50px] w-72 h-72 rounded-full opacity-40 blur-[100px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pointer-events-none"></div>
                <div className="absolute bottom-[-50px] left-[-50px] w-72 h-72 rounded-full opacity-40 blur-[100px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pointer-events-none"></div>

                <div className="container w-[90%] mx-auto relative z-10 flex h-full items-center justify-center text-white text-3xl">
                    <div className="w-[70%] max-lg:w-full max-lg:px-4 tit-sec1 text-center max-lg:text-left max-lg:-mt-30">
                        <motion.h2
                            initial={{ opacity: 0, x: isArabic ? 500 : -500 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: "linear" }}
                            className="font-Poppins font-[600] font-semi-bold text-[48px] max-lg:text-[50px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent ">
                            {t('vision_brought', 'A Vision Brought to Life')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: isArabic ? 500 : -500 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "linear" }}
                            className=" font-Poppins font-[400] font-regular text-[24px] max-lg:text-[20px] leading-[32px] mt-10 max-lg:mt-6">
                            {t('vision_desc2', 'A thoughtfully designed development that blends premium architecture, strategic location, and long-term investment value.')}
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* ======================= SEC 2 (Projects Lists) ======================= */}
            <div className="sec2 w-full h-[1700px] max-lg:h-auto max-lg:pb-20 bg-[linear-gradient(182.18deg,#FFFFFF_11.21%,#F1EDE4_74.1%)]">
                <div className="container w-[90%] mx-auto pt-15">
                    
                    {/* --- EGYPT PROJECTS --- */}
                    <div className="head-sec3 flex justify-between max-lg:items-center">
                        <div className="tit">
                            <p className=" font-Montserrat font-[700] font-bold text-[64px] max-lg:text-[40px]">
                                {t('projects', 'Projects')} <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('egypt', 'Egypt')}</span>
                            </p>
                        </div>
                        <Link
                            to="/egy_proj"
                            className="mt-10 max-lg:mt-2 w-40 h-13 text-center pt-3 border border-[#000000] font-Montserrat font-[700] text-[16px] text-[#000000] tracking-[0.2px] rounded-2xl cursor-pointer hover:scale-105 transition-transform">
                            {t('show_all_projects', 'Show all projects')}
                        </Link>
                    </div>
                    <div className="flex mt-10 justify-between max-lg:flex-col gap-3 max-lg:gap-6">
                        {regionProjectsData.map((item) => (
                            <div key={item.id} className="img1 w-[500px] max-lg:w-full h-[300px] max-lg:h-[250px] group overflow-hidden relative">
                                <img src={item.image} alt={item.location} className="w-full h-full object-cover rounded-xl" />
                                <div className={`overlay absolute inset-0 ${item.overlayColor} rounded-xl`}>
                                    <div className="w-[205px] h-[40px] bg-[#FFFEFD73] mt-3 ms-5 rounded-3xl p-2 group-hover:opacity-0 transition-opacity flex items-center">
                                        <CiLocationOn className='text-[30px]' />
                                        <p className="text-[#000000] font-Montserrat font-[700] text-[12px] tracking-[0.2px] mx-2 ">
                                            {t('egypt_new_cairo', 'Egypt .new Cairo')}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20">
                                        <Link
                                            to={item.link}
                                            className="border text-white px-6 py-4 rounded-full font-Montserrat font-[700] text-[14px] font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                                            {/* تطبيق دالة التعريب على عدد المشاريع */}
                                            {formatNumber(item.count, isArabic)} {t('projects_word', 'Projects')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- OMAN PROJECTS --- */}
                    <div className="head-sec3 flex justify-between mt-30 max-lg:mt-15 max-lg:items-center">
                        <div className="tit">
                            <p className="font-Montserrat font-[700] font-bold text-[64px] max-lg:text-[40px]">
                                {t('projects', 'Projects')} <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('oman', 'Oman')}</span>
                            </p>
                        </div>
                        <Link
                            to="/egy_proj"
                            className="mt-10 max-lg:mt-4 w-40 h-13 text-center pt-3 border border-[#000000] font-Montserrat font-[700] text-[16px] text-[#000000] tracking-[0.2px] rounded-2xl cursor-pointer hover:scale-105 transition-transform">
                            {t('show_all_projects', 'Show all projects')}
                        </Link>
                    </div>
                    <div className="flex mt-10 justify-between gap-3 max-lg:flex-col max-lg:gap-6">
                        {regionProjectsData2.map((item) => (
                            <div key={item.id} className="img1 w-[500px] max-lg:w-full h-[300px] max-lg:h-[250px] group overflow-hidden relative">
                                <img src={item.image} alt={item.location} className="w-full h-full object-cover rounded-xl" />
                                <div className={`overlay absolute inset-0 ${item.overlayColor} rounded-xl`}>
                                    <div className="w-[205px] h-[40px] bg-[#FFFEFD73] mt-3 ms-5 rounded-3xl p-2 group-hover:opacity-0 transition-opacity flex items-center">
                                        <CiLocationOn className='text-[30px]' />
                                        <p className="text-[#000000] font-Montserrat font-[700] text-[12px] tracking-[0.2px] mx-2 whitespace-nowrap">
                                            {t('oman_location', 'Oman .Muscat')}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20">
                                        <Link
                                            to={item.link}
                                            className="border text-white px-6 py-4 rounded-full font-Montserrat font-[700] text-[14px] font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                                            {formatNumber(item.count, isArabic)} {t('projects_word', 'Projects')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- UAE PROJECTS --- */}
                    <div className="head-sec3 flex justify-between mt-30 max-lg:mt-15 max-lg:items-center">
                        <div className="tit">
                            <p className="font-Montserrat font-[700] font-bold text-[64px] max-lg:text-[40px]">
                                {t('projects', 'Projects')} <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('uae', 'UAE')}</span>
                            </p>
                        </div>
                        <Link
                            to="/egy_proj"
                            className="mt-10 max-lg:mt-4 w-40 h-13 text-center pt-3 border border-[#000000] font-Montserrat font-[700] text-[16px] text-[#000000] tracking-[0.2px] rounded-2xl cursor-pointer hover:scale-105 transition-transform">
                            {t('show_all_projects', 'Show all projects')}
                        </Link>
                    </div>
                    <div className="flex mt-10 justify-between gap-3 max-lg:flex-col max-lg:gap-6">
                        {regionProjectsData.map((item) => (
                            <div key={item.id} className="img1 w-[500px] max-lg:w-full h-[300px] max-lg:h-[250px] group overflow-hidden relative">
                                <img src={item.image} alt={item.location} className="w-full h-full object-cover rounded-xl" />
                                <div className={`overlay absolute inset-0 ${item.overlayColor} rounded-xl`}>
                                    <div className="w-[205px] h-[40px] bg-[#FFFEFD73] mt-3 ms-5 rounded-3xl p-2 group-hover:opacity-0 transition-opacity flex items-center">
                                        <CiLocationOn className='text-[30px]' />
                                        <p className="text-[#000000] font-Montserrat font-[700] text-[12px] tracking-[0.2px] mx-2 whitespace-nowrap">
                                            {t('uae_location', 'UAE .Dubai')}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20">
                                        <Link
                                            to={item.link}
                                            className="border text-white px-6 py-4 rounded-full font-Montserrat font-[700] text-[14px] font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                                            {formatNumber(item.count, isArabic)} {t('projects_word', 'Projects')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* ======================= SEC 7 (Footer) ======================= */}
            <div className="sec7 w-full bg-[#000000] pt-16 sm:pt-20 sm:mt-0 pb-6 sm:pb-8 border-t-2 border-[#B58134]">
                <div className="container w-[90%] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
                        <div className="logo col-span-1 sm:col-span-2 lg:col-span-1 max-lg:text-center">
                            <img src={logo} alt="Logo" className='w-[250px] h-[250px] -mb-15 -my-20 max-lg:-mx-5 max-lg:-my2-0 max-lg:mb-5' />
                            <p className="text-gray-400 font-Montserrat font-[300] text-[24px] sm:text-[24px] md:text-[24px] max-lg:w-full max-lg:text-start leading-relaxed max-lg:-my-10">
                                {t('luxurious_life', 'A luxurious life is not just about a prime location or elegant design… It’s about a complete lifestyle.')}
                            </p>
                        </div>

                        <div className={`${isArabic ? 'mr-20 max-lg:mr-0' : 'ml-20 max-lg:ml-0'} flex sm:grid-cols-2 lg:grid-cols-4 sm:gap-35 mb-12 sm:mb-16 my-6 max-lg:flex-col max-lg:gap-10 max-lg:text-center`}>
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

                    <div className="footer pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-center sm:text-start">
                        <p className='font-Montserrat text-[12px] sm:text-[14px] text-gray-500'>aquariviera-eg.com</p>
                        <div className="flex gap-4 sm:gap-6">
                            <FaFacebook className='text-gray-400 text-[18px] sm:text-[22px] hover:text-[#B58134] transition-colors cursor-pointer' />
                            <IoLogoInstagram className='text-gray-400 text-[20px] sm:text-[24px] hover:text-[#B58134] transition-colors cursor-pointer' />
                            <FaLinkedin className='text-gray-400 text-[18px] sm:text-[22px] hover:text-[#B58134] transition-colors cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}