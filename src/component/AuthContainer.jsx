import React from 'react';

const AuthContainer = ({ children, title, subtitle, linkText, linkTo }) => {
  return (
    <div className=" items-center ">
           <div className=" flex flex-col mb-3 items-center justify-center item  md:hidden">
               
               <div className="items-center justify-center ">
                    <img
                  src="https://img.freepik.com/free-vector/illustration-share-icon_53876-5620.jpg?t=st=1733990994~exp=1733994594~hmac=3a05ec8cc7a4e3c56f5e45f0219d72a4b0f4fada424a0afedec34df461ec97a6&w=826"
                  alt="logo"
                  className="w-16 h-16  rounded-full  -rotate-90"
                  />
                  
               </div>
             <h1 className="text-3xl font-bold text-gray-900 mb-4">VConnect</h1>
             <p className="text-gray-600 text-lg">
             Connecting People
             </p>
           </div>
      <div className="mx-auto w-full max-w-md bg-white rounded-xl p-6 sm:p-10 border border-gray-200 shadow-lg">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800">{title}</h2>
        <p className="mt-2 text-center  text-gray-600">
          {subtitle}
          <a href={linkTo} className="font-medium text-blue-500 hover:underline">
            {linkText}
          </a>
        </p>
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
