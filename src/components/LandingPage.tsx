// src/pages/LandingPage.tsx
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#191C21] text-white min-h-screen flex flex-col justify-between">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <img
            src="/favicon.ico.png" // put your logo in public/favicon.ico.png
            alt="Logo"
            className="h-12 w-12"
          />
          <span className="text-xl font-bold">Wellness Tracker</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#about" className="hover:text-gray-400">About Us</a>
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
            <a onClick={() => navigate('/Login')} className="hover:text-gray-800 font-semibold text-black text-sm">LOGIN | SIGNUP</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-4">
          Track Your Wellness
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-300 max-w-2xl mb-6">
          A futuristic wellness tracking platform for students. Track your habits, stay motivated, and achieve your health goals with your peers.
        </p>

        {/* Get Started Button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-white text-black px-6 py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-gray-700 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Wellness Tracker. All Rights Reserved.</p>
        <p><a href="#terms" className="hover:text-white">Terms & Conditions</a></p>
      </footer>
    </div>
  );
}
