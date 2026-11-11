import React, { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../assets/logo.png';
import img1 from '../assets/home1.png';
import img2 from '../assets/home2.jpg';
import img21 from '../assets/home21.png';
import img22 from '../assets/home22.jpg';
import img3 from '../assets/home3.png';
import img31 from '../assets/home31.jpg';
import img32 from '../assets/home32.png';
import img33 from '../assets/home33.jpg';

import { MdOutlineKeyboardArrowRight, MdOutlineLanguage } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { FaTelegramPlane, FaFacebook } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin, FaArrowTrendUp } from "react-icons/fa6"; 

// --- دالة تحويل الأرقام الإنجليزية إلى عربية ---
const formatNumber = (num, isArabic) => {
    if (!num) return num;
    if (isArabic) {
        return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    }
    return num;
};

export default function Home() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en'; 
    const isArabic = currentLang === 'ar';

    const [homeData, setHomeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const response = await fetch('https://websites-property-hills-backend.obnhc2.easypanel.host/api/home-page',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch home page data');
                }
                const result = await response.json();
                setHomeData(result.data); 
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    const currentData = homeData?.[currentLang];

  return (
    <div className="w-full overflow-x-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* ======================= SEC 1 (Hero) ======================= */}
      <div className="sec1 w-full h-screen relative max-lg:w-full overflow-hidden">
        <img src={currentData?.hero_image || img1} alt="Hero" className='w-full h-screen object-cover z-0' />
        <div className="overlay absolute inset-0 bg-black/50 z-10 pt-50 max-lg:pt-20">
          <div className="container w-[90%] mx-auto ">
            
            <motion.p
              initial={{ opacity: 0, x: isArabic ? 500 : -500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "linear" }}
              className="w-[800px] font-Montserrat font-[800] font-bold text-[54px] text-[#ffffff] tracking-[0.2px] leading-[70px] max-lg:w-full max-lg:px-4 max-lg:text-[48px] max-lg:leading-[115%] max-lg:my-0 max-lg:mt-20">
               {currentData?.hero_title || t('hero_title', 'Real estate is the strongest investment. Start with the right step.')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: isArabic ? -650 : 650 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "linear" }}
              className="w-[600px] font-Montserrat font-[500] text-[20px] text-[#ffffff] tracking-[0.2px] leading-[30px] mt-10 max-lg:w-full max-lg:px-4 max-lg:mt-5 max-lg:text-[16px]">
              {currentData?.hero_subtitle || t('hero_subtitle', 'Ralph Consultancy delivers strategic real estate planning and feasibility studies to guide high-impact, successful property developments')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "linear" }}
              className="btn flex gap-5 mt-10 max-lg:flex-col max-lg:px-4 max-lg:mt-8">
              <Link
                to="/Projects"
                className=" bg-[linear-gradient(90deg,#B27C2C_0%,#B27C2C_32.69%,#B27C2C_58.17%,#CEAE55_75.96%,#E0CE70_87.5%,#EADF7E_94.23%,#F5F38E_100%)] text-[#FFFFFF] font-Montserrat font-[700] text-[16px] text-[black] tracking-[0.2px] px-7 py-3 rounded-xl cursor-pointer hover:scale-105 transition-transform text-center max-lg:w-full">
                {t('view_projects', 'View Projects')}
              </Link>
              <Link
                to="/about"
                className=" border border-[#FFFFFF] text-[white] font-Montserrat font-[700] text-[16px] text-[black] tracking-[0.2px] px-7 py-3 rounded-xl cursor-pointer hover:scale-105 transition-transform text-center max-lg:w-full">
                {t('learn_more', 'Learn More')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* ======================= SEC 2 (Explore) ======================= */}
      <div className="sec2 w-full h-full max-lg:py-10">
        <div className="container w-[90%] mx-auto pt-15 max-lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="head-sec2 text-center max-lg:text-start">
            <p className="font-Montserrat font-[800] text-[54px] leading-[70px] tracking-[0.2px] max-lg:text-[35px] max-lg:leading-[45px]">
                {t('explore_by', 'Explore by ')} <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('destination', 'Destination')}</span>
            </p>
            <p className="w-[1200px] mx-auto text-[#000000B0] font-Montserrat font-[500] font-meduim text-[40px] tracking-[0.2px] leading-[50px] max-lg:text-[18px] max-lg:w-full max-lg:leading-[140%] max-lg:ms-0 max-lg:mt-4">
                {t('discover_premium', 'Discover premium commercial real estate opportunities across our strategic markets')}
            </p>
          </motion.div>
          <div className=" img-sec2 mt-10 flex gap-5 max-lg:flex-col max-lg:mt-6">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
              className="img2 w-[700px] h-[600px] max-lg:w-full max-lg:h-auto group rounded-xl overflow-hidden relative">
              <Link to="/egy_proj">
                <img src={img2} alt="" className='w-full h-[600px] max-lg:h-[350px] object-cover rounded-xl group-hover:scale-105 duration-300 transition-transform' />
                <div className="info absolute inset-0 bg-black/30 ps-10 pt-60 max-lg:pt-20 max-lg:ps-5 max-lg:pe-5 ">
                  <p className="text-[#FAFAFA] font-Montserrat font-[700] text-[62px] max-lg:text-[40px]">{t('egypt', 'Egypt')}</p>
                  <p className="w-[500px] font-Outfit font-[500] text-[#FAFAFA] font-Medium text-[24px] pt-20 max-lg:w-full max-lg:text-[18px] max-lg:pt-5">
                    {t('premium_commercial_egypt', "Premium commercial real estate in Egypt's most sought-after locations")}
                  </p>
                  <div className="explore flex gap-50 mt-10 max-lg:flex-col max-lg:gap-2 max-lg:mt-5 rtl:gap-x-80">
                    <p className="text-[#FAFAFAA3] font-Outfit font-[500] font-Medium text-[24px] max-lg:text-[18px]">
                        {formatNumber(12, isArabic)} {t('projects_available', 'Projects Available')}
                    </p>
                    <div className="icon flex max-lg:py-0 items-center">
                      <p className="text-[#F8F8F8] font-Outfit font-[500] font-Medium text-[24px] max-lg:text-[18px]">{t('explore', 'Explore')}</p>
                      <MdOutlineKeyboardArrowRight className='text-[30px] max-lg:text-[25px] text-[#F8F8F8] rtl:rotate-180' />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            <div className="grid grid-cols1 gap-y-3 max-lg:w-full max-lg:gap-y-5">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="img2 w-[640px] h-[295px] max-lg:w-full max-lg:h-auto group rounded-xl overflow-hidden relative">
                <Link to="/egy_proj">
                  <img src={img21} alt="" className='w-full h-[295px] max-lg:h-[250px] object-cover rounded-xl group-hover:scale-105 duration-300 transition-transform' />
                  <div className="info absolute inset-0 bg-black/30 ps-10 max-lg:ps-5 max-lg:pe-5 max-lg:pt-10 flex flex-col justify-end pb-8">
                    <p className="text-[#FAFAFA] font-Montserrat font-[700] text-[62px] max-lg:text-[40px]">{t('oman', 'Oman')}</p>
                    <p className="font-Outfit font-[500] text-[#FAFAFA] font-Medium text-[24px] pt-2 max-lg:text-[18px]">
                        {t('premium_commercial_oman', "Premium commercial real estate in Oman's most sought-after locations")}
                    </p>
                    <div className="explore flex gap-50 mt-6 max-lg:flex-col max-lg:gap-2 max-lg:mt-5 rtl:gap-x-70">
                      <p className="text-[#FAFAFAA3] font-Outfit font-[500] font-Medium text-[24px] max-lg:text-[18px]">
                          {formatNumber(12, isArabic)} {t('projects_available', 'Projects Available')}
                      </p>
                      <div className="icon flex max-lg:py-0 items-center">
                        <p className="text-[#F8F8F8] font-Outfit font-[500] font-Medium text-[24px] max-lg:text-[18px]">{t('explore', 'Explore')}</p>
                        <MdOutlineKeyboardArrowRight className='text-[30px] max-lg:text-[25px] text-[#F8F8F8] rtl:rotate-180' />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="img2 w-[640px] h-[295px] max-lg:w-full max-lg:h-auto group rounded-xl overflow-hidden relative">
                <Link to="/egy_proj">
                  <img src={img22} alt="" className='w-full h-[400px] max-lg:h-[250px] object-cover rounded-xl group-hover:scale-105 duration-300 transition-transform' />
                  <div className="info absolute inset-0 bg-black/30 ps-10 max-lg:ps-5 max-lg:pe-5 max-lg:pt-10 flex flex-col justify-end pb-8">
                    <p className="text-[#FAFAFA] font-Montserrat font-[700] text-[62px] max-lg:text-[40px]">{t('uae', 'UAE')}</p>
                    <p className="font-Outfit font-[500] text-[#FAFAFA] font-Medium text-[24px] pt-2 max-lg:text-[18px]">
                        {t('premium_commercial_uae', "Premium commercial real estate in UAE's most sought-after locations")}
                    </p>
                    <div className="explore flex gap-50 mt-6 max-lg:flex-col max-lg:gap-2 max-lg:mt-5 rtl:gap-x-70">
                      <p className="text-[#FAFAFAA3] font-Outfit font-[500] font-Medium text-[24px] max-lg:text-[18px]">
                          {formatNumber(12, isArabic)} {t('projects_available', 'Projects Available')}
                      </p>
                      <div className="icon flex max-lg:py-0 items-center">
                        <p className="text-[#F8F8F8] font-Outfit font-[500] font-Medium text-[24px] max-lg:text-[18px]">{t('explore', 'Explore')}</p>
                        <MdOutlineKeyboardArrowRight className='text-[30px] max-lg:text-[25px] text-[#F8F8F8] rtl:rotate-180' />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ======================= SEC 3 (Featured) ======================= */}
      <div className="sec3 w-full h-[800px] max-lg:h-auto bg-[linear-gradient(182.18deg,#FFFFFF_11.21%,#F1EDE4_74.1%)] max-lg:py-10">
        <div className="container w-[90%] mx-auto pt-15 max-lg:pt-0">
          <div className="head-sec3 flex justify-between max-lg:flex-col">
            <div className="tit ">
              <p className="font-Montserrat font-[700] font-bold text-[64px] max-lg:text-[35px] max-lg:leading-[45px]">{t('featured', 'Featured ')} <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('projects', 'Projects')}</span></p>
              <p className="text-[#000000] font-Montserrat font-[400] text-[16px] max-lg:my-2">{t('experience_upscale', 'Experience upscale living where elegance meets convenience in every detail')}</p>
            </div>
            <Link
              to="/Projects"
              className="mt-15 w-40 text-center pt-4 border border-[#000000] font-Montserrat font-[700] text-[16px] text-[#000000] tracking-[0.2px] rounded-2xl cursor-pointer hover:scale-105 transition-transform max-lg:my-5 max-lg:h-[50px] max-lg:mx-auto max-lg:w-full">
              {t('show_all_areas', 'Show all Areas')}
            </Link>
          </div>
          
          <div className="img-sec3 grid grid-cols-2 gap-y-3 mt-10 max-lg:grid-cols-1 max-lg:gap-y-5">
            {[img3, img31, img32, img33].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="img3 w-[650px] h-[250px] bg-[white] rounded-2xl flex gap-5 max-lg:w-full max-lg:h-auto max-lg:flex-col max-lg:pb-5 overflow-hidden">
                <img src={image} alt="" className="w-1/2 h-full object-cover max-lg:w-full max-lg:h-[200px]" />
                <div className="info mt-5 ms-1 max-lg:px-4 max-lg:mt-3">
                  <div className="w-[260px] h-[40px] bg-[#B5813414] rounded-3xl py-2 flex items-center justify-center max-lg:w-fit max-lg:px-4 max-lg:ms-0">
                    <CiLocationOn className='text-[25px]' />
                    <p className="text-[#000000] font-Montserrat font-[700] text-[14px] ms-2">{t('egypt_fifth_settlement', 'Egypt .Fifth Settlement')}</p>
                  </div>
                  <p className="text-[#252D4B] font-Montserrat font-[600] text-[24px] font-semi-bold my-2 max-lg:text-[22px]">{t('mivida_Park','Mivida Business Park')}</p>
                  <p className="text-[#000000] font-Montserrat font-[400] text-[16px] font-regular leading-[100%] max-lg:text-[15px] max-lg:leading-[140%]">
                      {t('mivida_desc', 'Premium Grade-A office spaces in the heart of Fifth Settlemen......')}
                  </p>
                  <p className="line w-[95%] h-[2px] bg-[#00000038] -mx-1 my-5 mb-2 max-lg:w-full max-lg:mx-0"></p>
                  <p className="font-Outfit font-[400] text-[16px] font-regular text-[#222222]">{t('starting_from', 'Starting from')}</p>
                  <div className="flex gap-15 mt-2 max-lg:flex-col max-lg:gap-2">
                    <p className="text-[#B17A09] font-Montserrat font-[500] font-Medium text-[24px]">
                        {/* تعريب السعر هنا */}
                        {formatNumber("3000000", isArabic)} <span className="text-[13px]">{t('egy', 'EGY')}</span>
                    </p>
                    <Link to="/details" className="icon flex mt-2 max-lg:mt-0 items-center">
                      <p className="text-[#B17A09] font-Outfit font-[500] font-Medium text-[16px]">{t('explore', 'Explore')}</p>
                      <MdOutlineKeyboardArrowRight className='text-[24px] text-[#B17A09] rtl:rotate-180' />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================= SEC 4 (How It Works) ======================= */}
      <div className="sec4 w-full h-[600px] max-lg:h-auto bg-[#000000] max-lg:pb-15">
        <div className="container w-[90%] mx-auto pt-15 max-lg:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="head-sec4 text-center">
            <p className="font-Montserrat font-[700] font-bold text-[48px] max-lg:text-[35px] text-[#FAFAFA]">{t('how_it', 'How It ')} <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('works', 'Works')}</span></p>
            <p className="font-Montserrat font-[400] text-[24px] max-lg:text-[18px] text-[#FAFAFA] my-3 max-lg:my-5">{t('your_journey', 'Your journey to premium real estate investment made simple')}</p>
          </motion.div>
          
          <div className="icon flex mt-20 mx-20 justify-center max-lg:flex-col max-lg:mx-0 max-lg:mt-10 max-lg:items-center max-lg:gap-y-16 rtl:rotate-360 ">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-[70px] h-[70px] rounded-[999px] border border-[#B17A09] flex items-center justify-center">
                <MdOutlineLanguage className="text-[40px] text-[#B17A09]" />
              </div>
              <p className="mt-7 font-Montserrat font-[500] font-Medium text-[16px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('step_01', 'Step 01')}</p>
              <p className="mt-4 text-[#FFFFFF] font-Montserrat font-[700] font-bold text-[20px] text-center">{t('choose_dest', 'Choose Destination')}</p>
              <p className="w-[250px] text-[#FFFFFF] mt-2 text-center font-Montserrat font-[500] font-Medium text-[14px] leading-relaxed max-lg:w-[300px]">{t('select_from_markets', 'Select from our available markets in Egypt or Oman or UAE')}</p>
            </div>

            <div className="w-[250px] -mx-22 h-[1px] bg-[#B17A09] my-9  max-lg:hidden"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-[70px] h-[70px] rounded-[999px] border border-[#B17A09] flex items-center justify-center">
                <CiLocationOn className="text-[40px] text-[#B17A09]" />
              </div>
              <p className="mt-7 font-Montserrat font-[500] font-Medium text-[16px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('step_02', 'Step 02')}</p>
              <p className="mt-4 text-[#FFFFFF] font-Montserrat font-[700] font-bold text-[20px] text-center">{t('select_area', 'Select Area')}</p>
              <p className="w-[250px] text-[#FFFFFF] mt-2 text-center font-Montserrat font-[500] font-Medium text-[14px] leading-relaxed max-lg:w-[300px]">{t('browse_locations', 'Browse premium locations within your chosen destination')}</p>
            </div>

            <div className="w-[250px] -mx-22 h-[2px] bg-[#B17A09] my-9  max-lg:hidden"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-[70px] h-[70px] rounded-[999px] border border-[#B17A09] flex items-center justify-center">
                <HiMiniBuildingOffice2 className="text-[40px] text-[#B17A09]" />
              </div>
              <p className="mt-7 font-Montserrat font-[500] font-Medium text-[16px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('step_03', 'Step 03')}</p>
              <p className="mt-4 text-[#FFFFFF] font-Montserrat font-[700] font-bold text-[20px] text-center">{t('explore_projects', 'Explore Projects')}</p>
              <p className="w-[250px] text-[#FFFFFF] mt-2 text-center font-Montserrat font-[500] font-Medium text-[14px] leading-relaxed max-lg:w-[300px]">{t('discover_properties', 'Discover available properties that match your investment criteria')}</p>
            </div>

            <div className="w-[250px] -mx-22 h-[2px] bg-[#B17A09] my-9  max-lg:hidden"></div>

            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-[70px] h-[70px] rounded-[999px] border border-[#B17A09] flex items-center justify-center">
                <FaTelegramPlane className="text-[35px] text-[#B17A09]" />
              </div>
              <p className="mt-7 font-Montserrat font-[500] font-Medium text-[16px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('step_04', 'Step 04')}</p>
              <p className="mt-4 text-[#FFFFFF] font-Montserrat font-[700] font-bold text-[20px] text-center">{t('send_inquiry', 'Send Inquiry')}</p>
              <p className="w-[250px] text-[#FFFFFF] mt-2 text-center font-Montserrat font-[500] font-Medium text-[14px] leading-relaxed max-lg:w-[300px]">{t('connect_team', 'Connect with our team to discuss opportunities')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= SEC 5 (Why Choose) ======================= */}
      <div className="sec5 w-full h-[620px] max-lg:h-auto max-lg:pb-15 bg-white">
        <div className="container w-[90%] mx-auto">
          <div className="head-sec5 text-center pt-15 max-lg:text-start">
            <p className="font-Montserrat font-[700] font-bold text-[48px] max-lg:text-[35px] text-[#000000] ">
                {t('why_choose', 'Why Choose ')} <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">{t('property_hills', 'Property Hills')}</span>
            </p>
            <p className="font-Montserrat font-[400] text-[24px] max-lg:text-[18px] text-[#000000] my-3">{t('we_deliver', 'We deliver exceptional value through our expertise, network, and commitment to excellence')}</p>
          </div>
          <div className="flex mt-15 justify-between max-lg:flex-col max-lg:gap-y-5 max-lg:items-center">
            <div className="w-[300px] h-[350px] bg-[#B581330A] rounded-2xl p-10 max-lg:w-full max-lg:h-auto">
              <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pt-2 flex items-center justify-center">
                < CiLocationOn className='text-[black] text-[40px]' />
              </div>
              <p className="text-[#4C4C4C] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('prime_locations', 'Prime Locations')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#131212] mt-3">{t('prime_locations_desc', 'Strategic positioning in Egypt\'s and Oman\'s most sought-after commercial districts')}</p>
            </div>

            <div className="w-[300px] h-[350px] bg-[#B581330A] rounded-2xl p-10 max-lg:w-full max-lg:h-auto">
              <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pt-2 flex items-center justify-center">
                < IoSettings className='text-[black] text-[40px]' />
              </div>
              <p className="text-[#4C4C4C] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('prof_management', 'Professional Asset Management')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#131212] mt-3">{t('prof_management_desc', 'Expert property management ensuring optimal performance and tenant satisfaction')}</p>
            </div>

            <div className="w-[300px] h-[350px] bg-[#B581330A] rounded-2xl p-10 max-lg:w-full max-lg:h-auto">
              <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pt-2 flex items-center justify-center">
                <FaArrowTrendUp className='text-[black] text-[35px]' />
              </div>
              <p className="text-[#4C4C4C] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('high_roi', 'High ROI Opportunities')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#131212] mt-3">{t('high_roi_desc', 'Carefully selected investments designed for sustainable long-term returns')}</p>
            </div>

            <div className="w-[300px] h-[350px] bg-[#B581330A] rounded-2xl p-10 max-lg:w-full max-lg:h-auto">
              <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pt-2 flex items-center justify-center">
                <HiMiniBuildingOffice2 className='text-[black] text-[40px]' />
              </div>
              <p className="text-[#4C4C4C] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('fully_serviced', 'Fully Serviced Properties')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#131212] mt-3">{t('fully_serviced_desc', 'Comprehensive amenities and services for modern business operations')}</p>
            </div>
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
            <div className={`mt-7 ${isArabic ? 'mr-20 max-lg:mr-0' : 'ml-20 max-lg:ml-0'} max-lg:text-center max-lg:mt-5`}>
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