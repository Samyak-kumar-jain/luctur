import React from "react";
import Login from "../../Pages/Auth/Login";




const Auth = () => {
  return (
    <div className="grid-background">
      {/* <GlassNavbar/> */}
      
  
   


      <main>
      
        <div className="w-full flex flex-col lg:flex-row relative gap-16">
          {/* Left Section: Lecture Text (Hidden on small and medium devices, shown on large and up) */}
          <div className="lg:w-[50%] hidden lg:flex items-center justify-start ">
            <div className="w-full h-screen relative flex items-center justify-center ml-12">
              <div className="md:px-14 px-2 tracking-[20px]  bg-gray-600/5 backdrop-blur-sm rounded-full hidden lg:flex select-none  sm:justify-center sm:items-center ">
                <h1 className="text-[5vh] lg:text-[18vh] text-gray-700 bg-gradient-to-r from-blue-300 via-blue-200 to-gray-300 text-transparent bg-clip-text">
                  Lectur
                </h1>
              </div>
            </div>
          </div>

          {/* Right Section: Login Form */}
          <div className="flex items-center justify-center sm:justify-center md:pr-20 w-full sm:w-full lg:w-[50%] lg:flex lg:items-center lg:justify-end">
            <Login />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
