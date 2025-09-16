import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 👈 Import Axios here

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(""); // 👈 State to display errors

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => { // 👈 Make the handler async
    e.preventDefault();
    setError(""); // Clear previous errors

    const backendUrl = "http://localhost:5000/api";

    try {
      if (isSignup) {
        // --- SIGNUP LOGIC ---
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return;
        }

        await axios.post(`${backendUrl}/signup`, {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        });

        alert("Account created successfully! You can now log in.");
        setIsSignup(false);
        setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });

      } else {
        // --- LOGIN LOGIC ---
        const response = await axios.post(`${backendUrl}/login`, {
          email: formData.email,
          password: formData.password
        });

        // 📍 Store token in localStorage
        localStorage.setItem("token", response.data.token);

        console.log("Login successful:", response.data);

        navigate('/dashboard');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'An error occurred.');
      } else {
        setError('Network Error: Could not connect to the backend.');
      }
      console.error("Submission Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#191C21] flex">
      {/* Left Side - Branding */}
      <div className="w-1/2 bg-black text-white px-10 flex flex-col justify-center">
        <div>
          <p className=" text-[100px] mb-[-40px] leading-15 ">Well</p>
          <h1 className="font-black text-[220px] leading-none">Track.</h1>
          <p className="text-lg text-gray-300 w-[70%] mx-auto mt-[10%]">
            A futuristic wellness tracking platform for students. Track your habits, 
            stay motivated, and achieve your health goals with your peers.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-black flex items-center justify-center">
        <div className="p-10 rounded-2xl w-[400px] shadow-lg border border-white/30 flex flex-col items-center bg-black">
          {/* Logo */}
          <div className="mb-6">
            <img
              src="/favicon.ico.png"
              alt="WellTrack Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Toggle Buttons */}
          <div className="flex w-full mb-6">
            <button
              type="button"
              onClick={() => {
                setIsSignup(false);
                setError("");
                setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
              }}
              className={`flex-1 py-3 rounded-l-lg transition-colors ${
                !isSignup
                  ? "bg-white text-black font-semibold"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignup(true);
                setError("");
                setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
              }}
              className={`flex-1 py-3 rounded-r-lg transition-colors ${
                isSignup
                  ? "bg-white text-black font-semibold"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Display error message */}
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
            {isSignup && (
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="px-4 py-3 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors"
                required={isSignup}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 py-3 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="px-4 py-3 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors"
              required
            />
            {isSignup && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="px-4 py-3 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:border-white transition-colors"
                required={isSignup}
              />
            )}
            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>

          {/* Extra Links */}
          {!isSignup && (
            <p className="text-sm text-gray-400 mt-4 text-center cursor-pointer hover:text-white transition-colors">
              Forgot Password?
            </p>
          )}

          {/* Back to Home */}
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-400 mt-6 hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
