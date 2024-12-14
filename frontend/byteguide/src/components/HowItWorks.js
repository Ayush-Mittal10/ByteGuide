import React from 'react';

const steps = [
  { step: '1', title: 'Sign Up', description: 'Create your profile and input details about your learning journey.' },
  { step: '2', title: 'Get Your Plan', description: 'Receive a daily learning plan based on your input.' },
  { step: '3', title: 'Track Progress', description: 'Monitor your progress and adjust your learning plan as needed.' },
];

const HowItWorks = () => {
  return (
    <section id="howitworks" className="py-16 bg-dark text-white text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-gradient-to-r from-secondary to-primary p-8 rounded-md">
              <div className="text-5xl font-bold mb-4">{step.step}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
