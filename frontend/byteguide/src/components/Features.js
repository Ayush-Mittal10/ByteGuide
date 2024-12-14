import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { title: 'Personalized Plans', description: 'Learning plans tailored to your experience level and career goals.' },
  { title: 'Coding Skill Enhancement', description: 'Daily tasks to improve your coding abilities in various languages.' },
  { title: 'Project Recommendations', description: 'Build projects that matter, enhancing your profile for recruiters.' },
];

const cardVariants = {
  hover: {
    scale: 1.05,
    borderColor: '#FFD700',
    transition: {
      duration: 0.3,
    },
  },
};

const Features = () => {
  return (
    <section id="features" className="py-16 text-center bg-gradient-to-b from-primary to-secondary text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              className="feature-card bg-white text-dark p-8 rounded-lg shadow-lg border-4 border-transparent"
              whileHover="hover"
              variants={cardVariants}
            >
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
