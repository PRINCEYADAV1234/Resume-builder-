import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
   const logos = [
        'https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/framer.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg',
    ]

  return (
    <section className="flex flex-col items-center text-sm bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat font-poppins">
      {/* Launch Offer Banner */}
      <div className="w-full py-2.5 font-medium text-sm text-white text-center bg-gradient-to-r from-[#4F39F6] to-[#FDFEFF]">
        <p>
          <span className="px-3 py-1 rounded-md text-indigo-600 bg-white mr-2">
            New 
          </span>
            Ai Features Added
        </p>
      </div>

      {/* Navbar */}
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-slate-800 text-sm">
        <a href="/" className="flex items-center">
          {/* Logo */}

              <img
          src="../../../logo.svg"
          className="h-13 w-full"
          alt="hero section showcase"
        />
        </a>


        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-slate-500 transition cursor-pointer">
            Home
          </a>
          <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-slate-500 transition cursor-pointer">
            Features
          </a>
          <a href="#testimonials" onClick={(e) => { e.preventDefault(); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-slate-500 transition cursor-pointer">
            Testimonials
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-slate-500 transition cursor-pointer">
            Contact
          </a>
        </div>

        {/* Buttons */}
        {!isAuthenticated && (
          <div className="hidden md:block space-x-3">
            <button 
              onClick={() => navigate('/app')}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md">
              Get started
            </button>
            <button className="hover:bg-slate-100 transition px-6 py-2 border border-indigo-600 rounded-md">
              <Link to="/login">
                Login
              </Link>
            </button>
          </div>
        )}
        {isAuthenticated && (
          <div className="hidden md:block">
            <button 
              onClick={() => navigate('/app')}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md">
              Go to Dashboard
            </button>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden active:scale-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-white/60 text-slate-800 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300">
          <a href="#home" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}>Home</a>
          <a href="#features" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
          <a href="#testimonials" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); }}>Testimonials</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
          <button
            onClick={() => setMenuOpen(false)}
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Hero Section */}
      <main id="home" className="flex flex-col items-center max-md:px-2">
       <div className=" mt-25 flex flex-wrap items-center justify-center p-1 rounded-full bg-white border border-gray-300 text-sm">
            <div className="flex items-center">
                <img className="w-[30px] rounded-full border-3 border-white"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
                    alt="userImage1" />
                <img className="w-[30px] rounded-full border-3 border-white -translate-x-2"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
                    alt="userImage2" />
                <img className="w-[30px] rounded-full border-3 border-white -translate-x-4"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
                    alt="userImage3" />
            </div>
            <p className="-translate-x-2">Trusted by 10,000+ people</p>
        </div>
        <h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[80px] font-semibold max-w-4xl text-slate-900">
         Land your dream job with <br /> <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent text-nowrap"> AI-powered </span> resumes
        </h1>
        <p className="text-center text-base text-slate-700 max-w-lg mt-2">
         Create, edit and download professional resumes with <br /> AI-powered assistance.
        </p>

        <div className="flex items-center gap-4 mt-8">
          {!isAuthenticated ? (
            <>
              <button 
                onClick={() => navigate('/app')}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-lg px-7 h-11">
                Get started
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-lg px-8 h-11">
                Login
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/app')}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-lg px-7 h-11">
              Go to Dashboard
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>


        <p className="py-6 text-slate-600 mt-14">Trusting by leading brands, including</p>

                    <div className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4" id="logo-container">
                        {logos.map((logo, index) => <img key={index} src={logo} alt="logo" className="h-6 w-auto max-w-xs" />)}
                    </div>
      </main>
    </section>
  );
}




