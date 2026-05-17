import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // you can also use heroicons if preferred
import Translate from './Translate';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
 

  return (
    <nav className="bg-[#040C18] text-white px-7 py-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">LifeCoach.AI</div>

{/* translation component  */}
       
{/* <div className="flex items-center gap-2">
  <Translate />
</div> */}


        {/* Desktop Links */}
        <ul className="hidden md:flex gap-9 font-sans text-lg">
        <li className="relative group">
        <a href="/" 
         className="text-white transition duration-300">
            Home
    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>

            </a>
            </li>
         
          <li className="relative group">
  <a href="/about" className="text-white  transition duration-300">
    About Us
    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
  </a>
</li>

<li className="relative group"><a href="/diet-recommendation-form" className="text-white transition duration-300">
Lifestyle Form
<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>

</a></li>
<li className="relative group"><a href="/contact"          className="text-white transition duration-300">
Contact / Feedback
<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>

</a></li>
<li className="relative group">
            <a href="https://www.flipkart.com/food-products/natural-diet~brand/pr?sid=eat" target="_blank" rel="noreferrer"          className="text-white transition duration-300">

              Products
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>

            </a>
          </li>
        </ul>

        {/* Auth buttons (Desktop only) */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* <Link to="/login">
            <button className="bg-[#040C18] text-white px-4 py-2 rounded-md border border-white hover:bg-green-600 hover:text-white transition">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-[#FF4820] text-white px-4 py-2 rounded-md border border-white hover:bg-green-600 text-white transition">
              Sign Up
            </button>
          </Link> */}
        </div>

        {/* Hamburger Icon (Mobile only) */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3">
          <a href="/" className="hover:text-yellow-400">Home</a>
          <a href="/about" className="hover:text-yellow-400">About Us</a>
          <a href="/lifestyleform" className="hover:text-yellow-400">Lifestyle Form</a>
          <a href="/contact" className="hover:text-yellow-400">Contact / Feedback</a>
          <a href="https://www.flipkart.com/food-products/natural-diet~brand/pr?sid=eat" target="_blank" rel="noreferrer" className="hover:text-yellow-400">
            Products
          </a>
          
          {/* <Link to="/login">
            <button className="bg-[#040C18] text-white px-4 py-2 rounded-md border border-white hover:bg-white hover:text-black transition w-full">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-[#FF4820] text-white px-4 py-2 rounded-md hover:bg-[#e03e15] transition w-full">
              Sign Up
            </button>
          </Link> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
