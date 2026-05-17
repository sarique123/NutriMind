import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import banner from '../assets/banner.jpg';

const Landing = () => {
  return (
    <>
      <Navbar />
      <section className="flex justify-between items-center bg-[#010e24] text-white px-12 py-24">
        <div className="max-w-[50%]">
          <h1 className="text-[48px] text-[#FF8A71] mb-5">
            Your Personalized Lifestyle Coach
          </h1>
          <p>
            Smarter choices. Healthier habits. Better you.
            Discover how your sleep, diet, exercise, and screen time all come together — 
            get personalized recommendations that fit your student lifestyle.
          </p>
          <div className="mt-5 flex">
            <Link to="/lifestyleform">
              <button className="px-5 py-3 bg-[#a3381e] text-white rounded-r-md rounded-l-md hover:opacity-90 transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        <div className="w-[350px] h-[500px]">
          <img src={banner} alt="diet image" className="w-full h-full object-cover rounded-lg" />
        </div>
      </section>
    </>
  );
};

export default Landing;
