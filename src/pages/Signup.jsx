import React from 'react';
import Signup from '../component/SignUp/Signup';

function SignUpPage() {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex flex-1 bg-[#f7f2ef] items-center justify-center">
        <div className=" flex flex-col items-center justify-center item  ">
          <div className="items-center justify-center ">
            <img
              src="https://img.freepik.com/free-vector/illustration-share-icon_53876-5620.jpg?t=st=1733990994~exp=1733994594~hmac=3a05ec8cc7a4e3c56f5e45f0219d72a4b0f4fada424a0afedec34df461ec97a6&w=826"
              alt="logo"
              className="w-36 h-36  rounded-full mb-5 -rotate-90"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">VConnect</h1>
          <p className="text-gray-600 text-lg">Connecting People</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-white">
        <Signup />
      </div>
    </div>
  );
}

export default SignUpPage;
