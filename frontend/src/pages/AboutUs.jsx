import React from 'react';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#010e24] text-white font-[Segoe_UI] flex justify-center items-start px-4 py-12">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl text-[#ff7f50] mb-8 text-center">About Us</h1>

          <section className="mb-10">
            <h2 className="text-[#ffa07a] text-2xl mb-2">Who We Are</h2>
            <p className="text-[#f0f0f0] text-lg leading-relaxed">
              We’re a passionate team of health enthusiasts, data scientists, and educators
              dedicated to helping students develop better habits through smart technology.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-[#ffa07a] text-2xl mb-2">What We Do</h2>
            <p className="text-[#f0f0f0] text-lg leading-relaxed">
              LifeCoach.AI delivers personalized recommendations based on your sleep, diet, exercise,
              and screen time to guide you toward a healthier student life.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-[#ffa07a] text-2xl mb-2">Why We Exist</h2>
            <p className="text-[#f0f0f0] text-lg leading-relaxed">
              Student life is hectic. We created LifeCoach.AI to make wellness easy and accessible
              for everyone navigating academic challenges.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-[#ffa07a] text-2xl mb-2">Our Mission</h2>
            <p className="text-[#f0f0f0] text-lg leading-relaxed">
              To empower every student to live a healthier, more mindful life using AI-powered insights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-[#ffa07a] text-2xl mb-2">Our Values</h2>
            <ul className="list-disc pl-6 text-[#f0f0f0] text-lg leading-relaxed">
              <li>Empathy First</li>
              <li>Science-Backed Recommendations</li>
              <li>Data Privacy & Protection</li>
              <li>Continuous Growth & Learning</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-[#ffa07a] text-2xl mb-2">Meet the Team</h2>
            <ul className="list-disc pl-6 text-[#f0f0f0] text-lg leading-relaxed">
              <li>Jashanprit Singh</li>
              <li>Saqib Ali</li>
              <li>Lav Kumar</li>
              <li>Vinay Dahariya</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
