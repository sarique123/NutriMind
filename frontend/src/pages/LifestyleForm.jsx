import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function LifestyleForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sleep: "",
    exercise: "",
    study: "",
    screen: "",
    mood: "",
    age: "",
    menu: null,
    height: "",
    weight: "",
    gender: ""
  });

  const getMoodEmoji = (value) => {
    const moodMap = {
      1: "😞 Very Low",
      2: "😐 Low",
      3: "🙂 Neutral",
      4: "😊 Good",
      5: "😄 Great",
    };
    return moodMap[value] || "🙂 Neutral";
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: name === "menu" ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center p-6 bg-[#010e24] min-h-[89vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-[#0f1a2e] p-8 rounded-xl shadow-lg w-full max-w-4xl flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-[#ff7f50] text-center mb-4">
            Lifestyle Details
          </h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Current Age</label>
              <input
                type="number"
                name="age"
                min="0"
                max="120"
                step="1"
                placeholder="0"
                value={form.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Height */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Height (cm)</label>
              <input
                type="number"
                name="height"
                min="0"
                max="300"
                step="1"
                placeholder="0"
                value={form.height}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                min="0"
                max="500"
                step="1"
                placeholder="0"
                value={form.weight}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Gender</label>
              <div className="flex items-center space-x-6">
                {/* Male Option */}
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={form.gender === "Male"}
                    onChange={handleChange}
                    className="text-white bg-transparent border-gray-300 focus:ring-blue-300"
                  />
                  <label className="text-white">Male</label>
                </div>

                {/* Female Option */}
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={form.gender === "Female"}
                    onChange={handleChange}
                    className="text-white bg-transparent border-gray-300 focus:ring-blue-300"
                  />
                  <label className="text-white">Female</label>
                </div>
              </div>
            </div>

            {/* Sleep */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Sleep Hours</label>
              <input
                type="number"
                name="sleep"
                min="0"
                max="24"
                step="1"
                placeholder="0"
                value={form.sleep}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Exercise */}
            <div className="flex flex-col text-white gap-2 mb-6">
              <label htmlFor="exercise" className="font-semibold">
                Exercise Slots in a Day: {form.exercise || 0}{" "}
                {form.exercise === "1" ? "time" : "times"}
              </label>
              <input
                name="exercise"
                type="range"
                min={0}
                max={3}
                step={1}
                onChange={handleChange}
                value={form.exercise || 0}
                className="w-full h-2 rounded bg-gray-300 appearance-none focus:outline-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-400 px-1 text-[16px]">
                {[0, 1, 2, 3].map((val) => (
                  <span key={val}>
                    {val} {val === 1 ? "time" : "times"}
                  </span>
                ))}
              </div>
            </div>

            {/* Study Hours */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Study Hours</label>
              <input
                type="number"
                name="study"
                min="0"
                max="24"
                step="1"
                placeholder="0"
                value={form.study}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Screen Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Screen Time (min)</label>
              <input
                type="number"
                name="screen"
                min="0"
                max="1440"
                step="1"
                placeholder="0"
                value={form.screen}
                onChange={handleChange}
                className="w-full px-3 py-2 border bg-transparent text-white border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Mood */}
          <div className="flex flex-col text-white gap-2 mb-6">
            <label htmlFor="mood" className="font-semibold">
              Mood Today: {getMoodEmoji(form.mood)}
            </label>
            <input
              name="mood"
              type="range"
              min={1}
              max={5}
              step={1}
              onChange={handleChange}
              value={form.mood || 3}
              className="w-full h-2 rounded bg-gray-300 appearance-none focus:outline-none cursor-pointer"
            />
            <div className="flex justify-between text-xl px-1">
              {["😞", "😐", "🙂", "😊", "😄"].map((emoji, index) => (
                <span key={index}>{emoji}</span>
              ))}
            </div>
          </div>

          {/* Menu Upload */}
          <h1 className="text-white font-semibold text-lg">Upload mess menu image</h1>
          <input
            name="menu"
            type="file"
            onChange={handleChange}
            className="text-white"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-4 text-lg rounded-md hover:bg-green-700 transition duration-300"
          >
            Get Recommendations
          </button>
        </form>
      </div>
    </>
  );
}

export default LifestyleForm;
