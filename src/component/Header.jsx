import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // إضافات الترجمة

import { MdOutlineLanguage } from "react-icons/md";
import logo from '../assets/logo.png';

export default function TopHeader() {
  // تفعيل الترجمة
  const { t, i18n } = useTranslation();

   // دالة تغيير اللغة والاتجاه
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

 
// لما بعمل scroll الهيدر بيطلع وينزل
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // لما اعمل click علي اي link في الهيدر الخط يتحرك علي طول 
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest <= 0) {
      setIsHidden(false);
      return;
    }
    if (latest > previous && latest > 50) {
      setIsHidden(true);
      setIsMobileMenuOpen(false);
    } else {
      setIsHidden(false);
    }
  });

  // تم تغليف الأسماء بدالة الترجمة t()
  const navLinks = [
    { name: t('home', 'Home'), path: '/' },
    { name: t('about', 'About Us'), path: '/about' },
    { name: t('projects', 'Projects'), path: '/Projects'}, 
  ];

  return (
     <div
      className={`fixed top-0 left-0 w-full h-[80px]  shadow-md z-50 transition-transform duration-1000 linear ${
        isVisible ? '-translate-y-0' :'-translate-y-50'
      }`}
    >
    <motion.header     
        className="font-sora text-[20px] font-[700] font-bold w-full fixed top-0 left-0 z-50 bg-black/20  backdrop-blur-sm "
    >
      <div className="container w-[90%] md:w-[95%] lg:w-[80%] mx-auto px-3 h-20 md:h-24 flex items-center justify-between">
        
        <div className="flex items-center gap-30 lg:gap-70 ">
           <button 
          className="lg:hidden text-white z-50 p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 md:w-10 h-8 md:h-10 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg  fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 md:w-10 h-8 md:h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
          <Link to="/" className="flex items-center z-50" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src={logo} 
              alt="Ralph Logo" 
              className=" w-[150px] h-[200px] max-lg:mx-20"  
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-base font-semibold h-12 px-">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link 
                  key={item.name}
                  to={item.path}
                  className={`relative pb-1 transition-all duration-200 capitalize font-bold ${
                    isActive 
                      ? '-translate-y-1 text-[#F8F8F8] ' 
                      : 'text-white hover:text-[#B58134]'
                  }`}
                >
                  {item.name}
                  
                  {isActive && (
                    <motion.span
                     layoutId="activeLine" 
                     className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#B17A09]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
               />
                 )}
                </Link>    
              );
            })}
          </nav>
        </div>
        
        <div className='flex gap-5 max-lg:hidden '>
          {/* زرار تغيير اللغة للديسكتوب */}
          <div 
            className="icon flex gap-1 mt-3 cursor-pointer hover:text-[#B17A09] transition-colors" 
            onClick={toggleLanguage}
          >
            <MdOutlineLanguage className='text-[#FFFFFF] text-[22px] mt-0 '/>
            <p className="text-[#FFFFFF] text-[16px] font-Poppins">
              {i18n.language === 'ar' ? 'EN' : 'AR'}
            </p>
          </div>

          <Link 
          to="/contact" 
          className="hidden lg:block bg-[linear-gradient(90deg,#B27C2C_0%,#B27C2C_32.69%,#B27C2C_58.17%,#CEAE55_75.96%,#E0CE70_87.5%,#EADF7E_94.23%,#F5F38E_100%)] text-[#FFFFFF] font-Montserrat font-[700] text-[16px] text-[black] tracking-[0.2px] px-7 py-3 rounded-xl cursor-pointer hover:scale-105 transition-transform"
        >
          {t('contact_us', 'Contact Us')}
        </Link>
        </div>
        
      </div>    

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-[60%] bg-black/90  border-t border-gray-800 lg:hidden flex flex-col items-start px-1 md:px-12 py-8 gap-6 md:gap-8 shadow-xl  border-r-5 border-r-[#B58134]"
          >
            <div className="flex  gap-15 border-b pb-2 border-[#B58134] w-full items-center justify-between">
         
            <Link to="/" className="flex items-center z-50" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src={logo} 
              alt="Ralph Logo" 
              className="h-20 object-contain transition-transform  duration-200 hover:scale-105 max-lg:-my-15 "  
            />
          </Link>
          
          {/* زرار تغيير اللغة للموبايل */}
          <div 
            className="flex items-center gap-1 cursor-pointer bg-white/10 px-3 py-1 rounded-full text-white"
            onClick={() => {
              toggleLanguage();
              setIsMobileMenuOpen(false);
            }}
          >
            <MdOutlineLanguage className='text-[20px]'/>
            <span className="text-[14px] font-bold">{i18n.language === 'ar' ? 'EN' : 'عربي'}</span>
          </div>

            </div>
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
              <Link 
                 key={item.name}
                 to={item.path}
                 onClick={() => setIsMobileMenuOpen(false)}
                 className={`group relative w-full flex items-center justify-between pr-5 py-2 rounded-3xl transition-all duration-300 ${
                   isActive 
                   ? 'bg-gradient-to-r from-[#1a150b] to-[#120e06] border border-[#a68641] shadow-[0_0_15px_rgba(166,134,65,0.1)]' 
                   : 'bg-transparent border border-transparent hover:bg-white/5'
                 }`}
                >
                <div className="flex items-center gap-4">
                  <svg 
                   className={` h-6 transition-colors duration-300 ${isActive ? 'text-[#a68641]' : 'text-gray-400 group-hover:text-gray-300'}`} 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24"
                   >
                  </svg>

                    <span className={`text-lg font-medium tracking-wide transition-colors w-[200px] duration-300 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                     {item.name}
                    </span>
                </div>

                     <svg 
                       className={`w-10 h-5 transition-all duration-300 ease-out ${
                         isActive 
                        ? 'opacity-100 translate-x-0 text-[#a68641]' 
                        : 'opacity-0 rtl:translate-x-4 ltr:-translate-x-4 text-[#a68641] group-hover:opacity-100 group-hover:translate-x-0'
                         }`} 
                       fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                       >
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                     </svg>

                      {isActive && (
                       <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-[#a68641] opacity-5 mix-blend-screen pointer-events-none"></div>
                       )}
               </Link>  
              );
            })}
            
            <Link 
              to="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="ml-10 mt-4 bg-[linear-gradient(90deg,#B27C2C_0%,#B27C2C_32.69%,#B27C2C_58.17%,#CEAE55_75.96%,#E0CE70_87.5%,#EADF7E_94.23%,#F5F38E_100%)] text-[#FFFFFF] font-[700] text-[16px] md:text-[18px] px-8 py-3 rounded-xl "
            >
              {t('contact_us', 'Contact Us')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </div>
  );
}