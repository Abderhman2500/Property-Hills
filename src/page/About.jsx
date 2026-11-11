import React, { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import img1 from '../assets/about2.jpg';
import logo from '../assets/logo.png';

import { CiLocationOn } from "react-icons/ci";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { IoSettings } from "react-icons/io5";
import { FaFacebook, FaEye, FaAward, FaBullseye } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin, FaArrowTrendUp } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";

// --- دالة تحويل الأرقام الإنجليزية إلى عربية ---
const formatNumber = (num, isArabic) => {
    if (!num) return num;
    if (isArabic) {
        return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    }
    return num;
};

export default function About() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en'; 
  const isArabic = currentLang === 'ar';

  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- جلب البيانات من الـ API مرة واحدة فقط ---
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('https://websites-property-hills-backend.obnhc2.easypanel.host/api/about-us', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });

        if (!response.ok) throw new Error('Failed to fetch about us data');

        const result = await response.json();
        setAboutData(result.data); // حفظ اللغتين معاً
        setIsLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const currentData = aboutData?.[currentLang];

  if (error) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 font-Montserrat text-[20px]">Error loading data: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* ======================= SEC 1 (Hero) ======================= */}
      <div className="sec1 relative w-full h-screen bg-black overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-72 h-72 rounded-full opacity-40 blur-[100px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pointer-events-none"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-72 h-72 rounded-full opacity-40 blur-[100px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pointer-events-none"></div>

        <div className="container w-[90%] mx-auto relative z-10 flex h-full items-center justify-center text-white text-3xl">
          <div className="w-[70%] max-lg:w-full tit-sec1 text-center max-lg:text-left max-lg:-mt-30">
            <motion.h2
              initial={{ opacity: 0, x: isArabic ? 500 : -500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "linear" }}
              className="font-Poppins font-[600] font-semi-bold text-[48px] max-lg:text-[32px] max-md:text-[50px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent "
            >
              {currentData?.heroTitle || t('hero_title', 'Building Landmark Developments That Shape the Future of Urban Living')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: isArabic ? 500 : -500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "linear" }}
              className="font-Poppins font-[400] font-regular text-[24px] max-lg:text-[18px] max-md:text-[20px] leading-[32px] mt-10 max-lg:mt-5"
            >
              {currentData?.heroSubtitle || t('hero_subtitle', 'We combine strategic vision, premium locations, and exceptional design to create real estate projects that deliver lasting value and sustainable growth.')}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ======================= SEC 2 (About Us Content) ======================= */}
      <div className="sec2 w-full h-screen max-lg:h-auto max-lg:py-10 ">
        <div className="container w-[90%] mx-auto">
          <div className="flex mt-15 gap-5 max-lg:flex-col ">
            <div className="info w-[48%] max-lg:w-full">
              <motion.h2
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="font-Sora font-[700] font-bold text-[48px] max-lg:text-[35px] text-[#132440]"
              >
                {t('Building_Tomorrows', 'Building Tomorrows ')}
                <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">
                  {t('landmarks', 'Landmarks')}
                </span>
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="mt-10 max-lg:mt-5 text-[#131212] font-sora font-[400] text-[24px] max-lg:text-[18px] leading-[120%]"
              >
                {currentData?.description ? (
                   <div dangerouslySetInnerHTML={{ __html: currentData.description }} />
                ) : (
                  <>
                    <p className="mb-5">{t('akam_desc_1', 'AKAM is a premier real estate development and asset management company with a proven track record of delivering high-value commercial properties in strategic locations across Egypt and Oman.')}</p>
                    <p className="mb-5">{t('akam_desc_2', 'Our expertise lies in identifying prime investment opportunities, developing world-class commercial spaces, and managing assets to maximize long-term value for our investors and tenants.')}</p>
                    <p>{t('akam_desc_3', 'With a commitment to excellence and innovation, we create properties that set new standards in the commercial real estate sector.')}</p>
                  </>
                )}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: isArabic ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "linear" }}
              viewport={{ once: true, amount: 0.5 }}
              className="img w-[48%] max-lg:w-full h-[700px] max-lg:h-[400px] group rounded-xl overflow-hidden max-lg:mt-5"
            >
              <img src={currentData?.image || img1} alt={t('about_us', 'About Us')} className="w-full h-full object-cover rounded-xl group-hover:scale-105 duration-300 transition-transform cursor-pointer" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ======================= SEC 3 (Statistics) ======================= */}
      <div className="sec3 w-full h-[350px] max-lg:h-auto max-lg:pb-10 bg-[#F1EDE4]">
        <div className="container w-[90%] mx-auto pt-25 max-lg:pt-10">
          <div className="flex justify-between max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 max-lg:gap-5">
            <div className="box w-[250px] max-lg:w-full h-[150px] max-lg:h-auto max-lg:py-5 bg-[#FFFFFFBF] rounded-xl shadow-[0px_4px_4px_0px_#00000040] text-center pt-5">
              <p className="font-Montserrat font-[700] font-bold text-[40px] text-[#B27E2D]" dir="ltr">
                  {isArabic ? '+٢.٥ مليار' : '$2.5B+'}
              </p>
              <p className="font-Montserrat font-[500] font-meduim text-[16px] mt-2">{t('total_assets', 'Total Managed Assets')}</p>
            </div>
            <div className="box w-[250px] max-lg:w-full h-[150px] max-lg:h-auto max-lg:py-5 bg-[#FFFFFFBF] rounded-xl shadow-[0px_4px_4px_0px_#00000040] text-center pt-5">
              <p className="font-Montserrat font-[700] font-bold text-[40px] text-[#B27E2D]" dir="ltr">
                  +{formatNumber(18, isArabic)}
              </p>
              <p className="font-Montserrat font-[500] font-meduim text-[16px] mt-2">{t('premium_projects', 'Premium Projects')}</p>
            </div>
            <div className="box w-[250px] max-lg:w-full h-[150px] max-lg:h-auto max-lg:py-5 bg-[#FFFFFFBF] rounded-xl shadow-[0px_4px_4px_0px_#00000040] text-center pt-5">
              <p className="font-Montserrat font-[700] font-bold text-[40px] text-[#B27E2D]" dir="ltr">
                  +{formatNumber(15, isArabic)}
              </p>
              <p className="font-Montserrat font-[500] font-meduim text-[16px] mt-2">{t('years_experience', 'Years of Experience')}</p>
            </div>
            <div className="box w-[250px] max-lg:w-full h-[150px] max-lg:h-auto max-lg:py-5 bg-[#FFFFFFBF] rounded-xl shadow-[0px_4px_4px_0px_#00000040] text-center pt-5">
              <p className="font-Montserrat font-[700] font-bold text-[40px] text-[#B27E2D]" dir="ltr">
                  +{formatNumber(500, isArabic)}
              </p>
              <p className="font-Montserrat font-[500] font-meduim text-[16px] mt-2">{t('satisfied_clients', 'Satisfied Clients')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= SEC 5 (Why Choose) ======================= */}
      <div className="sec5 w-full h-[620px] max-lg:h-auto max-lg:pb-15 bg-[#000000]">
        <div className="container w-[90%] mx-auto">
          <div className="head-sec5 text-center pt-15 max-lg:text-start">
            <p className="font-Montserrat font-[700] font-bold text-[48px] max-lg:text-[35px] text-[#FFFFFF] ">
                {t('why_choose', 'Why Choose ')} 
                <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">
                  {t('property_hills', 'Property Hills')}
                </span>
            </p>
            <p className="font-Montserrat font-[400] text-[24px] max-lg:text-[18px] text-[#FFFFFF] my-3">
              {t('we_deliver', 'We deliver exceptional value through our expertise, network, and commitment to excellence')}
            </p>
          </div>
          <div className="flex mt-15 justify-between max-lg:flex-col max-lg:gap-y-5 max-lg:items-center">
            <div className="w-[300px] h-[350px] bg-[#FFFFFF1A] rounded-2xl p-10 max-lg:w-full max-lg:h-auto">
              <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pt-2 flex items-center justify-center">
                <CiLocationOn className='text-[#FFFFFF] text-[40px]' />
              </div>
              <p className="text-[#FFFFFF] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('prime_locations', 'Prime Locations')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#FFFFFF] mt-3">{t('prime_locations_desc', 'Strategic positioning in Egypt\'s and Oman\'s most sought-after commercial districts')}</p>
            </div>

            <div className="w-[300px] h-[350px] bg-[#FFFFFF1A] rounded-2xl p-10 max-lg:w-full max-lg:h-auto">
              <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pt-2 flex items-center justify-center">
                <IoSettings className='text-[#FFFFFF] text-[40px]' />
              </div>
              <p className="text-[#FFFFFF] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('prof_management', 'Professional Asset Management')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#FFFFFF] mt-3">{t('prof_management_desc', 'Expert property management ensuring optimal performance and tenant satisfaction')}</p>
            </div>

            <div className="w-[300px] h-[350px] bg-[#FFFFFF1A] rounded-2xl p-10 max-lg:w-full max-lg:h-auto">
              <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pt-2 flex items-center justify-center">
                <FaArrowTrendUp className='text-[#FFFFFF] text-[35px]' />
              </div>
              <p className="text-[#FFFFFF] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('high_roi', 'High ROI Opportunities')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#FFFFFF] mt-3">{t('high_roi_desc', 'Carefully selected investments designed for sustainable long-term returns')}</p>
            </div>

            <div className="w-[300px] h-[350px] bg-[#FFFFFF1A] rounded-2xl p-10 max-lg:w-full max-lg:h-auto">
              <div className="icon w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pt-2 flex items-center justify-center">
                <HiMiniBuildingOffice2 className='text-[#FFFFFF] text-[40px]' />
              </div>
              <p className="text-[#FFFFFF] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('fully_serviced', 'Fully Serviced Properties')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#FFFFFF] mt-3">{t('fully_serviced_desc', 'Comprehensive amenities and services for modern business operations')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= SEC 6 (Vision & Mission) ======================= */}
      <div className="sec6 w-full h-[550px] max-lg:h-auto max-lg:pb-15 bg-[#F1EDE4]">
        <div className="container w-[90%] mx-auto pt-20 max-lg:pt-10">
          <div className="flex gap-10 max-lg:flex-col">
            <div className="box w-[48%] max-lg:w-full h-[400px] max-lg:h-auto bg-[#000000] rounded-2xl p-20 max-lg:p-8">
              <div className="w-[80px] h-[80px] border-[2px] border-[#CC9E40] rounded-3xl flex items-center justify-center">
                <FaEye className='text-[#B07908] text-[40px]'/>
              </div>
              <p className="mt-5 font-Sora font-[600] font-semi-bold text-[32px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">
                {t('our_vision', 'Our Vision')}
              </p>
              <p className="mt-5 font-Sora font-[400] font-regular text-[16px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">
                {currentData?.vision || t('vision_desc', "To be recognized globally as the premier developer of luxury properties that define modern living standards, setting benchmarks for architectural excellence, sustainability, and community integration.")}
              </p>
            </div>

            <div className="box w-[48%] max-lg:w-full h-[400px] max-lg:h-auto bg-[#000000] rounded-2xl p-20 max-lg:p-8">
              <div className="w-[80px] h-[80px] border-[2px] border-[#CC9E40] rounded-3xl flex items-center justify-center">
                <FaBullseye className='text-[#B07908] text-[40px]'/>
              </div>
              <p className="mt-5 font-Sora font-[600] font-semi-bold text-[32px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">
                {t('our_mission', 'Our Mission')}
              </p>
              <p className="mt-5 font-Sora font-[400] font-regular text-[16px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">
                {currentData?.mission || t('mission_desc', "To create exceptional developments that enhance quality of life, deliver superior value to stakeholders, and contribute positively to the urban landscape through innovative design and responsible development practices.")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= SEC 7 (Core Values) ======================= */}
      <div className="sec7 w-full h-[650px] max-lg:h-auto max-lg:pb-15">
        <div className="container w-[90%] mx-auto">
          <div className="head-sec6 text-center pt-15">
            <p className="font-Montserrat font-[700] font-bold text-[48px] max-lg:text-[35px] text-[#000000]">
              {t('our_core', 'Our Core ')} 
              <span className="bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] bg-clip-text text-transparent">
                {t('values', 'Values')}
              </span>
            </p>
            <p className="font-Montserrat font-[400] text-[24px] max-lg:text-[18px] text-[#000000] my-3">
              {t('core_values_desc', 'The principles that guide everything we do')}
            </p>
          </div>
          <div className="flex mt-15 justify-between max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 max-lg:gap-5">
            <div className="w-[300px] max-lg:w-full h-[300px] max-lg:h-auto max-lg:pb-10 text-center bg-[linear-gradient(90deg,rgba(177,122,9,0.1)_0%,rgba(204,158,64,0.1)_26.27%,rgba(241,215,114,0.1)_50.57%,rgba(204,158,64,0.1)_69.21%,rgba(176,121,8,0.1)_100%)] shadow-[0px_4px_4px_0px_#00000040] rounded-2xl p-10">
              <div className="icon mx-auto w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] flex items-center justify-center">
                <FaAward className='text-[#FFFFFF] text-[40px]'/>
              </div>
              <p className="text-[#4C4C4C] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('transparency', 'Transparency')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#131212] mt-3">{t('transparency_desc', 'Clear communication and honest dealings in all our partnerships')}</p>
            </div>

            <div className="w-[300px] max-lg:w-full h-[300px] max-lg:h-auto max-lg:pb-10 text-center bg-[linear-gradient(90deg,rgba(177,122,9,0.1)_0%,rgba(204,158,64,0.1)_26.27%,rgba(241,215,114,0.1)_50.57%,rgba(204,158,64,0.1)_69.21%,rgba(176,121,8,0.1)_100%)] shadow-[0px_4px_4px_0px_#00000040] rounded-2xl p-10">
              <div className="icon mx-auto w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] flex items-center justify-center">
                <FaBullseye className='text-[#FFFFFF] text-[40px]'/>
              </div>
              <p className="text-[#4C4C4C] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('professionalism', 'Professionalism')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#131212] mt-3">{t('professionalism_desc', 'Highest standards of expertise and service delivery')}</p>
            </div>

            <div className="w-[300px] max-lg:w-full h-[300px] max-lg:h-auto max-lg:pb-10 text-center bg-[linear-gradient(90deg,rgba(177,122,9,0.1)_0%,rgba(204,158,64,0.1)_26.27%,rgba(241,215,114,0.1)_50.57%,rgba(204,158,64,0.1)_69.21%,rgba(176,121,8,0.1)_100%)] shadow-[0px_4px_4px_0px_#00000040] rounded-2xl p-10">
              <div className="icon mx-auto w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] flex items-center justify-center">
                <FiUsers className='text-[#FFFFFF] text-[40px]'/>
              </div>
              <p className="text-[#4C4C4C] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('trust', 'Trust')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#131212] mt-3">{t('trust_desc', 'Building lasting relationships through reliability and integrity')}</p>
            </div>

            <div className="w-[300px] max-lg:w-full h-[300px] max-lg:h-auto max-lg:pb-10 text-center bg-[linear-gradient(90deg,rgba(177,122,9,0.1)_0%,rgba(204,158,64,0.1)_26.27%,rgba(241,215,114,0.1)_50.57%,rgba(204,158,64,0.1)_69.21%,rgba(176,121,8,0.1)_100%)] shadow-[0px_4px_4px_0px_#00000040] rounded-2xl p-10">
              <div className="icon mx-auto w-[70px] h-[70px] rounded-3xl bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] flex items-center justify-center">
                <FaEye className='text-[#FFFFFF] text-[40px]'/>
              </div>
              <p className="text-[#4C4C4C] text-Poppins text-[700] font-bold text-[20px] mt-8">{t('excellence', 'Excellence')}</p>
              <p className="font-Poppins font-[400] text-[16px] text-[#131212] mt-3">{t('excellence_desc', 'Continuous pursuit of exceptional quality in every project')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= SEC 8 (CTA) ======================= */}
      <div className="sec8 w-full h-[600px] max-lg:h-auto bg-[#000000] relative max-lg:pb-15 overflow-hidden">
        <div className="absolute top-[300px] left-[550px] w-100 h-40 opacity-40 blur-[100px] bg-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] pointer-events-none"></div>
        <div className="container w-[90%] mx-auto pt-15">
          <div className="w-[100%] h-[400px] max-lg:h-auto max-lg:pb-10 border-3 border-[linear-gradient(90deg,#B17A09_0%,#CC9E40_26.27%,#F1D772_50.57%,#CC9E40_69.21%,#B07908_100%)] rounded-3xl shadow-[0px_4px_4px_0px_#FFFFFF33] flex max-lg:flex-col max-lg:items-center">
            <div className="img max-lg:flex max-lg:justify-center">
              <img src={logo} alt="Logo" className="w-[600px] h-[650px] max-lg:w-[300px] max-lg:h-[350px] -my-40 max-lg:my-0 max-lg:-mt-10"/>
            </div>
            <div className={`mt-7 ${isArabic ? 'mr-20 max-lg:mr-0' : 'ml-20 max-lg:ml-0'} max-lg:px-5 max-lg:text-center`}>
              <p className="text-[#FFFFFF] font-Inter font-[700] font-bold text-[48px] max-lg:text-[32px]">{t('cta_title', 'Ready to Find Your Next Home?')}</p>
              <p className="w-[550px] max-lg:w-full text-[#FFFFFF] font-Inter font-[400] text-[20px] max-lg:text-[16px] leading-[30px] mt-4">
                {t('cta_desc', 'Contact PrimeNest and Let Our Experts Help You Today, With Experience and Dedication, We Help You Take the First Step Toward Your New Home.')}
              </p>
              <div className="btn flex gap-5 mt-10 max-lg:justify-center max-lg:flex-col">
                <Link 
                  to="/contact" 
                  className="bg-[linear-gradient(90deg,#B27C2C_0%,#B27C2C_32.69%,#B27C2C_58.17%,#CEAE55_75.96%,#E0CE70_87.5%,#EADF7E_94.23%,#F5F38E_100%)] text-[#FFFFFF] font-Montserrat font-[700] text-[16px] tracking-[0.2px] px-7 py-3 rounded-xl cursor-pointer hover:scale-105 transition-transform text-center max-lg:w-full">
                  {t('contact_us_btn', 'Contact Us')}
                </Link>
                <Link 
                  to="/Projects" 
                  className="border border-[#FFFFFF] text-[white] font-Montserrat font-[700] text-[16px] tracking-[0.2px] px-7 py-3 rounded-xl cursor-pointer hover:scale-105 transition-transform text-center max-lg:w-full">
                  {t('browse_projects', 'Browse Projects')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= SEC 9 (Footer) ======================= */}
      <div className="sec9 w-full bg-[#000000] pt-16 sm:pt-20 sm:mt-0 pb-6 sm:pb-8 border-t-2 border-[#B58134]">
        <div className="container w-[90%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
            <div className="logo col-span-1 sm:col-span-2 lg:col-span-1">
              <img src={logo} alt="Logo" className='w-[250px] h-[250px] -mb-15 -my-20 max-lg:mx-auto' />
              <p className="text-gray-400 font-Montserrat font-[300] text-[24px] sm:text-[24px] md:text-[24px] max-lg:text-center leading-relaxed">
                {t('footer_desc', 'A luxurious life is not just about a prime location or elegant design… It’s about a complete lifestyle.')}
              </p>
            </div>
            
            <div className={`${isArabic ? 'mr-20 max-lg:mr-0' : 'ml-20 max-lg:ml-0'} flex max-lg:flex-col sm:grid-cols-2 lg:grid-cols-4 sm:gap-35 mb-12 sm:mb-16 my-6 max-lg:gap-10`}>
              <div className="info-footer max-lg:text-center">
                <p className='text-[#FFFFFF] font-Montserrat font-[600] text-[16px] sm:text-[18px] md:text-[20px] mb-4 sm:mb-6'>{t('navigation', 'Navigation')}</p>
                <div className="flex flex-col gap-3">
                  <Link to="/" className="text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('home', 'Home')}</Link>
                  <Link to="/Projects" className="text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('destination', 'Destination')}</Link>
                  <Link to="/egy_proj" className="text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('projects_link', 'Projects')}</Link>
                </div>
              </div>
  
              <div className="info-footer max-lg:text-center">
                <p className='text-[#FFFFFF] font-Montserrat font-[600] text-[16px] sm:text-[18px] md:text-[20px] mb-4 sm:mb-6'>{t('company', 'Company')}</p>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <Link to="/about" className="text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('about_us_link', 'About us')}</Link>
                  <Link to="/about" className=" text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('mission_vision_link', 'Our mission and vision')}</Link>
                </div>
              </div>
              
              <div className="info-footer max-lg:text-center">
                <p className='text-[#FFFFFF] font-Montserrat font-[600] text-[16px] sm:text-[18px] md:text-[20px] mb-4 sm:mb-6'>{t('support', 'Support')}</p>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <Link to="/contact" className="text-gray-400 hover:text-[#B58134] transition-colors font-Montserrat text-[13px] sm:text-[14px] md:text-[15px]">{t('contact_us_link', 'Contact us')}</Link>
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