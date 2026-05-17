import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/feedback", formData)
      .then((res) => {
        setStatus("Thank you for your feedback!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error(err);
        setStatus("Something went wrong. Please try again.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-[#010e24]  p-4">
        <div className="max-w-md w-full bg-gradient-to-br from-[#03214d] to-[#040C18] p-8 rounded-xl shadow-md">
          <h2 className="text-center text-2xl text-[#ff7f50] mb-6">Contact / Feedback</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className=" w-full p-2 border border-gray-300 rounded-md mt-2 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-base h-[100px] resize-y"
            ></textarea>
            <button
              type="submit"
              className="p-2 bg-blue-600 mt-2 hover:bg-[#005fa3] text-white rounded-md text-base transition duration-300"
            >
              Submit
            </button>
            {status && (
  <p 
    className={`mt-4 text-center font-medium ${status.includes("Thank you for your feedback!") ? "text-green-500" : "text-red-500"}`}
  >
    {status}
  </p>
)}

          </form>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
