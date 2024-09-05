import React from 'react';
import { useNavigate } from 'react-router-dom'; 
const Landing = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login'); // Replace '/login' with your actual login route
      };
    
      const handleSignUpClick = () => {
        navigate('/login'); // Replace '/signup' with your actual sign-up route
      };
    return (
        <div className="bg-gradient-to-b from-[#101212] relative to-[#08201D]">
            <header className="absolute inset-x-0 top-0 z-10 w-full">
                <div classNames="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex-shrink-0">
                            <a href="#" title="" className="flex">
                                <img className="w-auto h-8" src="Logo.png" alt="Logo" />
                            </a>
                        </div>

                        <div className="lg:flex lg:items-center lg:justify-end lg:space-x-6 sm:ml-auto">
                        <a
        onClick={handleLoginClick}
        className="hidden text-base text-white transition-all duration-200 lg:inline-flex hover:text-opacity-80 cursor-pointer no-underline"
        title=""
      >
        Log in
      </a>

      <a
        onClick={handleSignUpClick}
        className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 text-white bg-white/20 hover:bg-white/40 focus:bg-white/40 rounded-lg cursor-pointer no-underline"
        role="button"
        title=""
      >
        Sign Up for free
      </a>
                           </div>

                        <button type="button" className="inline-flex p-2 ml-1 text-white transition-all duration-200 rounded-md sm:ml-4 lg:hidden focus:bg-gray-800 hover:bg-gray-800">
                            {/* Menu open: "hidden", Menu closed: "block" */}
                            <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>

                            {/* Menu open: "block", Menu closed: "hidden" */}
                            <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <section className="relative lg:min-h-[1000px] pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pb-24">
                <div className="absolute inset-x-0 bottom-0 z-10 hidden lg:flex">
                    <img className="hidden w-full lg:block" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards.png" alt="Credit cards" />
                    <img className="block w-full lg:hidden" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/credit-cards-mobile.png" alt="Credit cards mobile" />
                </div>

                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
                    <div className="max-w-xl mx-auto text-center">
                        <h1 className="text-4xl font-bold sm:text-6xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white"> Simplified Financial Tracking Application </span>
                        </h1>
                        <p className="mt-5 text-base text-white sm:text-xl">Welcome! You're on the right path. Get started with FinTrack and take control of your expenses today!</p>

                        <a onClick={handleSignUpClick} title="" className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg sm:mt-16 hover:bg-blue-700 focus:bg-blue-700 no-underline" role="button">
                            Sign Up for free
                            <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>

                        <div className="grid grid-cols-1 px-20 mt-12 text-left gap-x-12 gap-y-8 sm:grid-cols-3 sm:px-0">
                            <div className="flex items-center">
                                <svg className="flex-shrink-0" width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M25.1667 14.187H20.3333C17.6637 14.187 15.5 16.3507 15.5 19.0203V19.8258C15.5 19.8258 18.0174 20.6314 22.75 20.6314C27.4826 20.6314 30 19.8258 30 19.8258V19.0203C30 16.3507 27.8363 14.187 25.1667 14.187Z"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18.7227 6.9369C18.7227 4.71276 20.5263 2.90912 22.7504 2.90912C24.9746 2.90912 26.7782 4.71276 26.7782 6.9369C26.7782 9.16104 24.9746 11.7702 22.7504 11.7702C20.5263 11.7702 18.7227 9.16104 18.7227 6.9369Z"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13.2231 15.8512H7.11157C3.73595 15.8512 1 18.5871 1 21.9628V22.9814C1 22.9814 4.18311 24 10.1674 24C16.1516 24 19.3347 22.9814 19.3347 22.9814V21.9628C19.3347 18.5871 16.5988 15.8512 13.2231 15.8512Z"
                                        fill="#0B1715"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M5.07422 6.68386C5.07422 3.87152 7.35485 1.59088 10.1672 1.59088C12.9795 1.59088 15.2602 3.87152 15.2602 6.68386C15.2602 9.4962 12.9795 12.7954 10.1672 12.7954C7.35485 12.7954 5.07422 9.4962 5.07422 6.68386Z"
                                        fill="#0B1715"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="ml-3 text-sm text-white sm:text-base">Get rewarded up to 10% Cashback</p>
                            </div>

                            <div className="flex items-center">
                                <svg className="flex-shrink-0" width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.3254 1H7.6748C4.1498 1 1.43701 3.71279 1.43701 7.23779V18.7622C1.43701 22.2872 4.1498 25 7.6748 25H15.3254C18.8504 25 21.5632 22.2872 21.5632 18.7622V7.23779C21.5632 3.71279 18.8504 1 15.3254 1Z"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M11.5001 21.1241C13.6996 21.1241 15.4758 19.3478 15.4758 17.1483C15.4758 14.9488 13.6996 13.1726 11.5001 13.1726C9.30057 13.1726 7.52435 14.9488 7.52435 17.1483C7.52435 19.3478 9.30057 21.1241 11.5001 21.1241Z"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M11.5026 8.53174C11.8494 8.53174 12.1314 8.24971 12.1314 7.90288V7.79699C12.1314 7.45015 11.8494 7.16812 11.5026 7.16812C11.1558 7.16812 10.8738 7.45015 10.8738 7.79699V7.90288C10.8738 8.24971 11.1558 8.53174 11.5026 8.53174Z"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="ml-3 text-sm text-white sm:text-base">Security & privacy guaranteed</p>
                            </div>

                            <div className="flex items-center">
                                <svg className="flex-shrink-0" width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M26.7775 6.6143C24.6193 4.59243 21.5486 3.70629 18.5234 3.87664C15.9435 3.98096 13.4073 4.98068 10.7933 4.98068C8.43089 4.98068 5.96034 3.84083 3.59473 3.90619C2.26578 3.94387 0.978525 4.2569 0.000782354 4.79861"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8.27469 1.29301L9.36113 3.67288C9.53113 4.05288 9.84392 4.33628 10.2382 4.42028L13.0001 5.00014"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19.0728 1L18.0227 3.41163C17.8575 3.80247 17.5382 4.09906 17.1508 4.22212L14.9878 4.87673"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15.2769 9.56543L14.7173 13.5058C14.5435 14.7121 13.806 15.7708 12.7051 16.3977L10.6584 17.5778"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19.8906 13.5308L20.4364 17.0984C20.626 18.2638 19.7714 19.4588 18.6078 19.7275L16.2566 20.2861"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9.65234 23C10.7494 23 11.6367 22.1127 11.6367 21.0156C11.6367 19.9186 10.7494 19.0312 9.65234 19.0312C8.55528 19.0312 7.66797 19.9186 7.66797 21.0156C7.66797 22.1127 8.55528 23 9.65234 23Z"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18.0414 23C19.1384 23 20.0257 22.1127 20.0257 21.0156C20.0257 19.9186 19.1384 19.0312 18.0414 19.0312C16.9443 19.0312 16.057 19.9186 16.057 21.0156C16.057 22.1127 16.9443 23 18.0414 23Z"
                                        stroke="#28CC9D"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="ml-3 text-sm text-white sm:text-base">100% Refundable Deposits</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing ;
