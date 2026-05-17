
import React from 'react';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LifestyleForm from './pages/LifestyleForm';
import AboutUs from './pages/AboutUs';
import ContactForm from './pages/ContactForm';
import Form from "./pages/DietRecommendationForm";
import StressLevelForm from "./pages/StressLevelForm"


function App() {
  return (
<BrowserRouter>
<Routes>
  
<Route path='/' element={<Home/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/lifestyleform' element={<LifestyleForm/>}></Route>
<Route path='/stress-test-form' element={<StressLevelForm/>}></Route>
<Route path='/diet-recommendation-form' element={<Form/>}></Route>
<Route path='/signup' element={<Signup/>}></Route>
<Route path="/about" element={<AboutUs />} />
<Route path="/contact" element={<ContactForm />} />
</Routes>
</BrowserRouter>
  );
}

export default App;
