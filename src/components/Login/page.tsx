import React, { useState } from "react";

const Login: React.FC = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  return (
    <div id="login" className="h-[100vh] w-full flex font-sans">
      {/* Left Side */}
      <div className="h-full w-1/2 bg-black text-white px-10 flex flex-col justify-center">
        <p className="font-semibold text-[120px] mb-[-40px]">Dev</p>
        <p className="font-black text-[270px] leading-none">Sync.</p>
        <div className="text-center flex justify-center">
          <p className="text-lg text-gray-300 w-[70%] mt-[20%]">
            A platform to connect, collaborate, and grow together. Join us and
            be part of the next big thing.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="h-full w-1/2 bg-black flex items-center justify-center">
        <div className="p-10 rounded-2xl w-[400px] shadow-lg border border-white/20 flex flex-col items-center">
          {/* Logo */}
          <div className="mb-4">
            <img
              width={120}
              height={120}
              src="/favicon.ico.png"
              alt="WellTrack Logo"
              className="object-contain"
            />
          </div>

          {/* Toggle Buttons */}
          <div className="flex w-full mb-6">
            <button
              type="button"
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-2 rounded-l-lg ${
                !isSignup
                  ? "bg-white text-black font-semibold"
                  : "bg-gray-800 text-white"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-2 rounded-r-lg ${
                isSignup
                  ? "bg-white text-black font-semibold"
                  : "bg-gray-800 text-white"
              }`}
            >
              Signup
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col space-y-4 w-full">
            {isSignup && (
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-2 bg-transparent text-white border border-gray-600 focus:outline-none focus:border-white"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 bg-transparent text-white border border-gray-600 focus:outline-none focus:border-white"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 bg-transparent text-white border border-gray-600 focus:outline-none focus:border-white"
            />
            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="px-4 py-2 bg-transparent text-white border border-gray-600 focus:outline-none focus:border-white"
              />
            )}
            <button
              type="submit"
              className="w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          {/* Extra Links */}
          {!isSignup && (
            <p className="text-sm text-gray-400 mt-4 text-center cursor-pointer hover:text-white">
              Forgot Password?
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
