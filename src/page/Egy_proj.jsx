import React, { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";

import logo from '../assets/logo.png'
import img1 from '../assets/egy1.png'
import img2 from '../assets/egy2.jpg'
import img3 from '../assets/egy3.png'
import img4 from '../assets/egy4.png'
import img5 from '../assets/egy5.jpg'
import img6 from '../assets/egy6.png'
import img7 from '../assets/egy7.png'
import img8 from '../assets/egy8.jpg'
import img9 from '../assets/egy9.png'
import img10 from '../assets/egy10.jpg'

// --- دالة تحويل الأرقام (تضيف فواصل الآلاف وتحول للعربي) ---
const formatNumber = (num, isArabic) => {
    if (!num) return num; // لو مفيش سعر
    
    // تنظيف الرقم من أي فواصل قديمة
    const cleanNum = num.toString().replace(/,/g, '');
    
    // تحويله لرقم وإضافة فواصل الآلاف (مثال: 3000000 -> 3,000,000)
    let formattedNum = Number(cleanNum).toLocaleString('en-US');
    
    // لو القيمة مش رقم سيبها زي ما هي
    if (formattedNum === "NaN") formattedNum = num.toString();

    // التحويل للأرقام الهندية (العربية) لو اللغة عربي
    if (isArabic) {
        return formattedNum.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    }
    return formattedNum;
};

// --- دالة لمعالجة روابط الصور ---
const getValidImageUrl = (url) => {
    if (!url) return img1; 
    if (url.startsWith('http')) return url; 
    return `https://websites-property-hills-backend.obnhc2.easypanel.host${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function Egy_proj() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const isArabic = currentLang === 'ar';

    const [pageData, setPageData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); 
    
    const [activeCategoryKey, setActiveCategoryKey] = useState("all"); 

    const categories = [
        { key: "all", labelEn: "All" },
        { key: "new_cairo", labelEn: "New Cairo" },
        { key: "maadi", labelEn: "Maadi" },
        { key: "6th_of_october", labelEn: "6th of October" }
    ];

    const backupPropertiesData = [
        { id: 1, image: img1, location: t('egypt_new_cairo', 'Egypt .New Cairo'), title: t('mivida_park', 'Mivida Business Park'), desc: t('mivida_desc', 'Premium Grade-A office spaces in the heart of Fifth Settlemen......'), price: "3000000", category: "new_cairo" },
        { id: 2, image: img2, location: t('egypt_maadi', 'Egypt .Maadi'), title: t('maadi_grand', 'Maadi Grand Tower'), desc: t('maadi_desc', 'Premium Grade-A office spaces in the heart of Maadi......'), price: "4500000", category: "maadi" },
        { id: 3, image: img3, location: t('egypt_october', 'Egypt .6th of October'), title: t('october_plaza', 'October Plaza'), desc: t('october_desc', 'Premium Grade-A office spaces in the heart of October......'), price: "2000000", category: "6th_of_october" },
    ];

    useEffect(() => {
        const fetchEgyptProjects = async () => {
            try {
                const response = await fetch('https://websites-property-hills-backend.obnhc2.easypanel.host/api/projects', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch projects');

                const result = await response.json();
                setPageData(result.data); 
                setIsLoading(false);
            } catch (err) {
                console.error("API Error:", err);
                setPageData({ en: backupPropertiesData, ar: backupPropertiesData }); 
                setIsLoading(false);
            }
        };

        fetchEgyptProjects();
    }, []);

    const currentProjects = Array.isArray(pageData?.[currentLang]) 
        ? pageData[currentLang] 
        : pageData?.[currentLang]?.projects || backupPropertiesData;

    const filteredProjects = currentProjects.filter((project) => {
        const loc = project.location ? project.location.toLowerCase() : "";
        const isEgyptProject = loc.includes("egypt") || loc.includes("مصر") || loc.includes("cairo") || loc.includes("قاهرة") || loc.includes("maadi") || loc.includes("october");

        if (!isEgyptProject) return false; 

        let matchesCategory = false;
        if (activeCategoryKey === "all") {
            matchesCategory = true;
        } else {
            const categoryTranslated = t(activeCategoryKey);
            const categoryEn = categories.find(c => c.key === activeCategoryKey)?.labelEn || "";
            
            matchesCategory = 
                project.category === activeCategoryKey || 
                (project.location && (project.location.includes(categoryTranslated) || project.location.includes(categoryEn)));
        }

        const matchesSearch = 
            (project.title && project.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
            (project.location && project.location.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesSearch;
    });

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
                            {pageData?.[currentLang]?.heroTitle || t('egypt_hero_title', 'Egypt Project — Where Opportunity Meets Growth')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: isArabic ? 500 : -500 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "linear" }}
                            className=" font-Poppins font-[400] font-regular text-[24px] max-lg:text-[18px] max-md:text-[20px] leading-[32px] mt-10 max-lg:mt-6">
                            {pageData?.[currentLang]?.heroDesc || t('egypt_hero_desc', 'A strategically positioned development designed to capture the strength of Egypt’s evolving real estate market and deliver long-term value.')}
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* ======================= SEC 2 (Projects List & Filter) ======================= */}
            <div className="sec2 w-full min-h-[1700px] max-lg:h-auto max-lg:pb-20 bg-[linear-gradient(182.18deg,#FFFFFF_11.21%,#F1EDE4_74.1%)]">
                <div className="container w-[90%] mx-auto pt-15 max-lg:pt-10">
                    <div className="tit max-lg:text-center">
                        <p className="font-Montserrat font-[700] font-bold text-[64px] max-lg:text-[45px] max-lg:text-left">
                            {isArabic ? (
                                <>{t('projects', 'Projects')} <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('egypt', 'Egypt')}</span></>
                            ) : (
                                <>{t('egypt', 'Egypt')} <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('projects', 'Projects')}</span></>
                            )}
                        </p>
                    </div>
                    
                    <div className="flex mt-10 justify-between max-lg:flex-col max-lg:gap-6">
                        <div className="btn flex gap-3 max-lg:flex-wrap max-lg:justify-center">
                            {categories.map((cat) => (
                                <button 
                                    key={cat.key}
                                    onClick={() => setActiveCategoryKey(cat.key)}
                                    className={`w-[180px] max-lg:w-[48%] h-[60px] max-lg:h-[50px] rounded-2xl font-Poppins font-[600] font-semi-bold text-[24px] max-lg:text-[18px] transition-colors
                                    ${activeCategoryKey === cat.key 
                                        ? "text-[#000000] bg-[linear-gradient(90deg,#B27C2C_0%,#B27C2C_32.69%,#B27C2C_58.17%,#CEAE55_75.96%,#E0CE70_87.5%,#EADF7E_94.23%,#F5F38E_100%)]" 
                                        : "bg-[#B17A090F] border-[2px] border-[#686D761A] text-[#373A40B5] hover:bg-[#B17A0920]"}`}
                                >
                                    {t(cat.key, cat.labelEn)}
                                </button>
                            ))}
                        </div>
                        
                        <div className="my-1 relative max-lg:w-full">
                            <CiSearch className={`text-[20px] text-[#5855557D] absolute top-4 ${isArabic ? 'right-5' : 'left-5'}`}/>
                            <input 
                                type="text" 
                                placeholder={t('search', 'Search')} 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`border w-full min-w-[250px] max-lg:w-full h-[50px] border-[#373A40] text-[#5855557D] rounded-3xl ${isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'} focus:outline-none focus:border-[#B17A09]`} 
                            />
                        </div>
                    </div>

                    <div className="img-sec2 grid grid-cols-2 max-lg:grid-cols-1 gap-x-5 gap-y-5 max-lg:gap-y-6 mt-10">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((property) => (
                                <div key={property.id} className="w-full h-[250px] max-lg:h-auto bg-[white] rounded-2xl flex max-lg:flex-col gap-5 max-lg:gap-0 max-lg:pb-5">
                                    <img 
                                        src={getValidImageUrl(property.image || property.cover_image || property.images?.[0])} 
                                        alt={property.title || 'Project'} 
                                        onError={(e) => { e.target.onerror = null; e.target.src = img1; }}
                                        className={`w-[200px] max-lg:w-full h-full max-lg:h-[200px] object-cover max-lg:rounded-t-2xl max-lg:rounded-b-none ${isArabic ? 'rounded-e-2xl' : 'rounded-s-2xl'}`}
                                    />
                                    
                                    <div className="info mt-5 ms-1 max-lg:px-4 max-lg:mt-4 w-full">
                                        <div className="w-fit px-4 h-[40px] bg-[#B5813414] rounded-3xl py-2 flex items-center">
                                            <CiLocationOn className="text-[25px]" />
                                            <p className="text-[#000000] font-Montserrat font-[700] text-[14px] ms-1">{property.location}</p>  
                                        </div>
                                        <p className="text-[#252D4B] font-Montserrat font-[600] text-[24px] max-lg:text-[22px] font-semi-bold my-2">{property.title}</p>
                                        <p className="text-[#000000] font-Montserrat font-[400] text-[16px] max-lg:text-[15px] font-regular leading-[100%] max-lg:leading-[140%]">{property.desc}</p>
                        
                                        <p className="line w-[95%] max-lg:w-full h-[2px] bg-[#00000038] my-5 mb-2"></p>
                                        <p className="font-Outfit font-[400] text-[16px] font-regular text-[#222222]">{t('starting_from', 'Starting from')}</p>
                        
                                        <div className="flex justify-between items-center pe-5 max-lg:flex-col max-lg:items-start max-lg:gap-2 mt-2">
                                            {/* ----- جزء السعر بعد التعديل بالفواصل ----- */}
                                            <p className="text-[#B17A09] font-Montserrat font-[500] font-Medium text-[24px]">
                                                {formatNumber(property.price || property.starting_price, isArabic)} <span className="text-[13px]">{t('egy', 'EGY')}</span>
                                            </p>
                            
                                            <Link to={`/details/${property.slug || property.id}`} className="icon flex items-center">
                                                <p className="text-[#B17A09] font-Outfit font-[500] font-Medium text-[16px]">{t('explore', 'Explore')}</p>
                                                <MdOutlineKeyboardArrowRight className="text-[24px] text-[#B17A09] rtl:rotate-180" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center text-gray-500 font-Montserrat text-[20px] mt-10">
                                {t('no_projects_found', 'No projects found matching your criteria.')}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ======================= SEC 6 (CTA) ======================= */}
            <div className="sec6 w-full h-[600px] bg-[#000000] relative max-lg:h-auto max-lg:py-15 overflow-hidden">
                <div className="absolute top-[300px] left-[550px] w-100 h-40 opacity-40 blur-[100px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pointer-events-none"></div>
                <div className="container w-[90%] mx-auto pt-15 ">
                    <div className="w-[100%] h-[400px] max-lg:h-auto border-3 border-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] rounded-3xl shadow-[0px_4px_4px_0px_#FFFFFF33] flex max-lg:flex-col max-lg:items-center max-lg:pb-10 max-lg:px-4">
                        <div className="img">
                            <img src={logo} alt="" className="w-[600px] h-[650px] -my-40 max-lg:w-[300px] max-lg:h-auto max-lg:my-0 max-lg:-mt-52" />
                        </div>
                        <div className="mt-7 ms-20 max-lg:ms-0 max-lg:text-center max-lg:mt-5">
                            <p className="text-[#FFFFFF] font-Inter font-[700] font-bold text-[48px] max-lg:text-[30px] leading-tight">{t('ready_to_find', 'Ready to Find Your Next Home?')}</p>
                            <p className="w-[550px] max-lg:w-full text-[#FFFFFF] font-Inter font-[400] text-[20px] leading-[30px] max-lg:mt-4">
                                {t('contact_primenest', 'Contact PrimeNest and Let Our Experts Help You Today, With Experience and Dedication, We Help You Take the First Step Toward Your New Home.')}
                            </p>
                            <div className="btn flex gap-5 mt-10 max-lg:flex-col max-lg:gap-3">
                                <Link
                                    to="/contact"
                                    className=" bg-[linear-gradient(90deg,#B27C2C_0%,#B27C2C_32.69%,#B27C2C_58.17%,#CEAE55_75.96%,#E0CE70_87.5%,#EADF7E_94.23%,#F5F38E_100%)] text-[#FFFFFF] font-Montserrat font-[700] text-[16px] text-[#FFFFFF] tracking-[0.2px] px-7 py-3 rounded-xl cursor-pointer hover:scale-105 transition-transform max-lg:w-full text-center">
                                    {t('contact_us', 'Contact Us')}
                                </Link>
                                <Link
                                    to="/Projects"
                                    className=" border border-[#FFFFFF] text-[white] font-Montserrat font-[700] text-[16px] text-[black] tracking-[0.2px] px-7 py-3 rounded-xl cursor-pointer hover:scale-105 transition-transform max-lg:w-full text-center">
                                    {t('browse_projects', 'Browse Projects')}
                                </Link>
                            </div>
                        </div>
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
      
                        <div className="ms-20 flex sm:grid-cols-2 lg:grid-cols-4 sm:gap-35 mb-12 sm:mb-16 my-6 max-lg:ms-0 max-lg:flex-col max-lg:gap-10 max-lg:text-center">
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