import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center text-white text-center mt-0">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold leading-tight mb-4">Guidance for Your Coding Journey</h1>
        <p className="text-xl mb-8">Personalized learning plans for engineering students to enhance their coding and project skills.</p>  
        <Link to="/onboarding">
          <button className="px-6 py-3 bg-accent text-light rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
