import React, { useState, useEffect } from 'react'
import { motion } from "motion/react";
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../assets/logo.png'
import img1 from '../assets/egy1.png'
import img11 from '../assets/details1.png'
import img2 from '../assets/details2.png'
import img3 from '../assets/details3.png'
import img5 from '../assets/egy5.jpg'
import img6 from '../assets/egy6.png'

import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { LuCircleParking } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GrVmMaintenance } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";

// --- دالة تحويل الأرقام (تضيف فواصل الآلاف وتحول للعربي) ---
const formatNumber = (num, isArabic) => {
    // لو مفيش سعر، رجع قيمة افتراضية عشان ميظهرش فاضي
    if (num === null || num === undefined || num === '') return isArabic ? '٠' : '0'; 
    
    const cleanNum = num.toString().replace(/,/g, '');
    let formattedNum = Number(cleanNum).toLocaleString('en-US');
    if (formattedNum === "NaN") formattedNum = num.toString();

    if (isArabic) {
        return formattedNum.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    }
    return formattedNum;
};

// --- دالة لمعالجة روابط الصور (لو جاية ناقصة من السيرفر) ---
const getValidImageUrl = (url, defaultImg = img1) => {
    if (!url) return defaultImg; 
    if (url.startsWith('http')) return url; 
    return `https://websites-property-hills-backend.obnhc2.easypanel.host${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function Details() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const isArabic = currentLang === 'ar';
    
    const { slug } = useParams();

    const [projectData, setProjectData] = useState(null);
    const [similarProjectsData, setSimilarProjectsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const backupSimilarProperties = [
        { id: 5, image: img5, location: t('egypt_fifth_settlement', 'Egypt .Fifth Settlement'), title: t('mivida_park', 'Mivida Business Park'), desc: t('mivida_short_desc', 'Premium Grade-A office spaces in the heart of Fifth Settlemen......'), price: "3000000" },
        { id: 6, image: img6, location: t('egypt_fifth_settlement', 'Egypt .Fifth Settlement'), title: t('mivida_park', 'Mivida Business Park'), desc: t('mivida_short_desc', 'Premium Grade-A office spaces in the heart of Fifth Settlemen......'), price: "3000000" },
    ];

    const backupProjectDetails = {
        title: t('mivida_park', 'Mivida Business Park'),
        location: t('egypt_fifth_settlement', 'Egypt .Fifth Settlement'),
        price: "30000000",
        description: t('mivida_long_desc', "Premium Grade-A office spaces in the heart of Fifth Settlement, offering world-class amenities and strategic location for corporate headquarters. State-of-the-art technology park designed for IT companies..."),
        images: [img1, img11, img2, img3, img2]
    };

    useEffect(() => {
        const fetchAllData = async () => {
            if (!slug) {
                setProjectData({ en: backupProjectDetails, ar: backupProjectDetails });
                setSimilarProjectsData({ en: backupSimilarProperties, ar: backupSimilarProperties });
                setIsLoading(false);
                return;
            }

            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                };

                const [detailsResponse, similarResponse] = await Promise.all([
                    fetch(`https://websites-property-hills-backend.obnhc2.easypanel.host/api/projects/${slug}`, { method: 'GET', headers }),
                    fetch(`https://websites-property-hills-backend.obnhc2.easypanel.host/api/projects/${slug}/similar`, { method: 'GET', headers })
                ]);

                if (!detailsResponse.ok) throw new Error(`Project not found: 404`);

                const detailsResult = await detailsResponse.json();
                setProjectData(detailsResult.data); 

                if (similarResponse.ok) {
                    const similarResult = await similarResponse.json();
                    setSimilarProjectsData(similarResult.data);
                } else {
                    setSimilarProjectsData({ en: backupSimilarProperties, ar: backupSimilarProperties });
                }

                setIsLoading(false);
            } catch (err) {
                console.error("API Error (Falling back to default data):", err);
                setProjectData({ en: backupProjectDetails, ar: backupProjectDetails });
                setSimilarProjectsData({ en: backupSimilarProperties, ar: backupSimilarProperties });
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [slug]);

    const currentDetails = projectData?.[currentLang] || backupProjectDetails;
    
    const currentSimilarProjects = Array.isArray(similarProjectsData?.[currentLang]) 
        ? similarProjectsData[currentLang] 
        : similarProjectsData?.[currentLang]?.projects || backupSimilarProperties;

    const projectImages = currentDetails.images?.length > 0 ? currentDetails.images : backupProjectDetails.images;

    return (
        <div className="w-full  overflow-x-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="sec1 w-full h-full max-lg:h-auto max-lg:pb-20 bg-[#F8F8F8]">
                <div className="container w-[90%] mx-auto pt-30 max-lg:pt-20">
                    
                    <div className="head-sec1">
                        <h2 className="font-Poppins font-[700] font-bold text-[40px] max-lg:text-[30px] text-[#000000] ">
                            {t('property_details', 'Property Details')}
                        </h2>
                        <p className="mt-5 font-Montserrat font-[600] font-semi-bold text-[#000000] text-[48px] max-lg:text-[32px] max-lg:leading-[120%]">
                            {currentDetails.title}
                        </p>
                    </div>
                    
                    <div className="flex gap-30 max-lg:flex-col max-lg:gap-10 mt-10 max-lg:mt-5">
                        
                        <div className="img relative max-lg:w-full">
                            <img 
                                src={getValidImageUrl(currentDetails.image || currentDetails.cover_image || projectImages[0])} 
                                alt={currentDetails.title} 
                                onError={(e) => { e.target.onerror = null; e.target.src = img1; }}
                                className="w-[800px] max-lg:w-full h-[400px] max-lg:h-[250px] rounded-2xl object-cover"
                            />
                            
                            <div className={`dot absolute top-20 max-lg:top-5 ${isArabic ? 'left-10 max-lg:left-5' : 'right-10 max-lg:right-5'}`}>
                                <p className="w-2 h-2 rounded-[999px] bg-[white] "></p>
                                <p className="w-2 h-2 pt-5 mt-10 max-lg:mt-5 rounded-[999px] bg-[white] outline-1 outline-offset-3 outline-[white] "></p>
                                <p className="w-2 h-2 mt-10 max-lg:mt-5 rounded-[999px] bg-[white] "></p>
                                <p className="w-2 h-2 mt-10 max-lg:mt-5 rounded-[999px] bg-[white] "></p>
                                <p className="w-2 h-2 mt-10 max-lg:mt-5 rounded-[999px] bg-[white] "></p>
                            </div>

                            <div className="box flex gap-2 mt-5 max-lg:overflow-x-auto max-lg:pb-2">
                                {projectImages.slice(1, 5).map((image, index) => (
                                    <img 
                                        key={index} 
                                        src={getValidImageUrl(image, backupProjectDetails.images[index + 1])} 
                                        alt={`thumbnail-${index}`} 
                                        onError={(e) => { e.target.onerror = null; e.target.src = img11; }}
                                        className="w-[195px] max-lg:w-[100px] h-[150px] max-lg:h-[80px] shrink-0 rounded-2xl object-cover" 
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="info w-[500px] max-lg:w-full h-full max-lg:h-auto bg-[#FFFFFF] rounded-2xl shadow-[0px_4px_4px_0px_#00000040] p-10 max-lg:p-5">
                            <p className="font-Poppins font-[600] font-semi-bold text-[20px] max-lg:text-[18px] text-[#000000]">
                                {t('interested_in_property', 'Interested in this property?')}
                            </p>
                            <p className="font-Poppins font-[400] text-[12px] text-[#000000] mt-3">
                                {t('send_inquiry_desc', 'Send us an inquiry and our team will contact you shortly.')}
                            </p>
                            
                            <input type="text" placeholder={t('full_name', 'Full name')} className="name w-[95%] max-lg:w-full h-[50px] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#00000040] mt-10 text-[#000] font-Montserrat font-[400] text-[16px] px-5 outline-none focus:border focus:border-[#B17A09]" />
                            <input type="text" placeholder={t('phone_number', 'Phone number')} className="phone w-[95%] max-lg:w-full h-[50px] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#00000040] mt-10 text-[#000] font-Montserrat font-[400] text-[16px] px-5 outline-none focus:border focus:border-[#B17A09]" />
                            <input type="email" placeholder={t('email_address', 'Email address')} className="email w-[95%] max-lg:w-full h-[50px] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#00000040] mt-10 text-[#000] font-Montserrat font-[400] text-[16px] px-5 outline-none focus:border focus:border-[#B17A09]" />
                            <textarea placeholder={t('hello_interested', 'Hello, I am interested in...')} className="email w-[95%] max-lg:w-full h-[120px] bg-[#FFFFFF] shadow-[0px_4px_4px_0px_#00000040] mt-10 text-[#000] font-Montserrat font-[400] text-[16px] px-5 py-3 outline-none focus:border focus:border-[#B17A09] resize-none"></textarea>
                            
                            <button className="w-[95%] max-lg:w-full h-[50px] bg-[#000000] text-[#FFFFFF] font-Montserrat font-[700] text-[16px] rounded-2xl mt-5 hover:scale-105 transition-transform">
                                {t('submit_inquiry', 'Submit Inquiry')}
                            </button>
                        </div>
                    </div>
                    
                    {/* --- السعر الأساسي للمشروع هنا --- */}
                    <div className="w-[450px] max-lg:w-full h-[150px] max-lg:h-auto max-lg:py-5 bg-[#B17A0908] border border-[#B17A0954] rounded-2xl p-5 mt-10 max-lg:mt-8">
                        <p className="font-Montserrat font-[600] font-semi-bold text-[#000000] text-[24px] max-lg:text-[20px]">
                            {t('starting_from', 'Starting from')}
                        </p>
                        <p className="font-Montserrat font-[600] font-semi-bold text-[#000000] text-[48px] max-lg:text-[35px]" dir='ltr'>
                            <span dir={isArabic ? 'rtl' : 'ltr'}>{t('egp', 'EGP')}</span> {formatNumber(currentDetails.price || currentDetails.starting_price || currentDetails.cost, isArabic)}
                        </p>
                    </div>
                    
                    <div className="flex gap-2 mt-10">
                        <FaLocationDot className='text-[25px] my-1 text-[#0000006E]'/>
                        <p className="font-Montserrat font-[700] text-[24px] max-lg:text-[20px] text-[#0000006E] ">
                            {currentDetails.location}
                        </p>
                    </div>
                    
                    <p className="text-[#000000] font-Poppins font-[700] text-[24px] mt-5">{t('about_this_project', 'About This Project')}</p>
                    
                    <div 
                        className="w-[600px] max-lg:w-full text-[#000000] font-Poppins font-[400] text-[15px] leading-[22px] mt-5"
                        dangerouslySetInnerHTML={{ __html: currentDetails.description }}
                    />
                    
                    <p className="text-[#000000] font-Poppins font-[700] text-[24px] mt-15 max-lg:mt-10">{t('services_amenities', 'Services & Amenities')}</p>

                    <div className="flex mt-10 justify-between grid grid-cols-4 max-lg:flex-none max-lg:grid-cols-2 max-sm:grid-cols-1 gap-y-5 max-lg:gap-4">
                        {/* Services Boxes... */}
                        <div className="box w-[250px] max-lg:w-full h-[100px] border-[2px] border-[#B27C2C] rounded-2xl flex items-center">
                            <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] mx-3 flex items-center justify-center shrink-0">
                                <MdOutlineSecurity className='text-[40px] text-white'/>
                            </div>
                            <p className="font-Montserrat font-[700] font-bold text-[18px] leading-tight">{t('security', '24/7 Security')}</p>
                        </div>

                        <div className="box w-[250px] max-lg:w-full h-[100px] border-[2px] border-[#B27C2C] rounded-2xl flex items-center">
                            <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] mx-3 flex items-center justify-center shrink-0">
                                <LuCircleParking className='text-[40px] text-white'/>
                            </div>
                            <p className="font-Montserrat font-[700] font-bold text-[18px] leading-tight">{t('parking', 'Parking')}</p>
                        </div>

                        <div className="box w-[250px] max-lg:w-full h-[100px] border-[2px] border-[#B27C2C] rounded-2xl flex items-center">
                            <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] mx-3 flex items-center justify-center shrink-0">
                                <HiOutlineBuildingOffice2 className='text-[40px] text-white'/>
                            </div>
                            <p className="font-Montserrat font-[700] font-bold text-[18px] leading-tight">{t('facilities', 'Facilities')}</p>
                        </div>

                        <div className="box w-[250px] max-lg:w-full h-[100px] border-[2px] border-[#B27C2C] rounded-2xl flex items-center">
                            <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] mx-3 flex items-center justify-center shrink-0">
                                <GrVmMaintenance className='text-[40px] text-white'/>
                            </div>
                            <p className="font-Montserrat font-[700] font-bold text-[18px] leading-tight">{t('maintenance', 'Maintenance')}</p>
                        </div>
                        
                        <div className="box w-[250px] max-lg:w-full h-[100px] border-[2px] border-[#B27C2C] rounded-2xl flex items-center">
                            <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] mx-3 flex items-center justify-center shrink-0">
                                <FiUsers className='text-[40px] text-white'/>
                            </div>
                            <p className="font-Montserrat font-[700] font-bold text-[18px] leading-tight">{t('property_management', 'Property Management')}</p>
                        </div>
                    </div>

                    <p className="mt-15 max-lg:mt-10 font-Poppins font-[700] text-[24px] text-[#000000]">{t('similar_properties', 'Similar Properties')}</p>
                    
                    <div className="img-sec2 grid grid-cols-2 max-lg:grid-cols-1 gap-x-5 gap-y-5 max-lg:gap-y-6 mt-10">
                        {currentSimilarProjects.map((property) => (
                            <div key={property.id} className="w-full h-[250px] max-lg:h-auto bg-[white] rounded-2xl flex max-lg:flex-col gap-5 max-lg:gap-0 max-lg:pb-5 shadow-sm">
                                <img 
                                    src={getValidImageUrl(property.image || property.cover_image, img5)} 
                                    alt={property.title} 
                                    onError={(e) => { e.target.onerror = null; e.target.src = img5; }}
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
                                        
                                        {/* --- أسعار المشاريع المشابهة هنا --- */}
                                        <p className="text-[#B17A09] font-Montserrat font-[500] font-Medium text-[24px]">
                                            {formatNumber(property.price || property.starting_price || property.cost, isArabic)} <span className="text-[13px]">{t('egy', 'EGY')}</span>
                                        </p>
                            
                                        <Link to={`/details/${property.slug || property.id}`} className="icon flex items-center">
                                            <p className="text-[#B17A09] font-Outfit font-[500] font-Medium text-[16px]">{t('explore', 'Explore')}</p>
                                            <MdOutlineKeyboardArrowRight className="text-[24px] text-[#B17A09] rtl:rotate-180" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="sec7 w-full bg-[#000000] pt-16 sm:pt-20 sm:mt-15 pb-6 sm:pb-8 border-t-2 border-[#B58134]">
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