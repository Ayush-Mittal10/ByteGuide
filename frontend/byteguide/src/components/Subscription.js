import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star } from 'lucide-react';
import { initializeRazorpay } from '../utils/razorpay';

export default function PremiumSubscriptionPage() {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {

      try {
        const response = await fetch('https://byteguide-backend.onrender.com/authentication/login-status', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        const data = await response.json();
        if (!data.isLoggedIn) {
          navigate(`/login?from=${encodeURIComponent(window.location.pathname)}`);
        } else {
          const userResponse = await fetch('https://byteguide-backend.onrender.com/authentication/get-user-data', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include'
          });
          const userData = await userResponse.json();
          setUserId(userData.userId);
        }
      } catch (error) {
        console.error('Failed to verify login status', error);
      }
    };

    const fetchPlans = async () => {
      try {
        const response = await fetch('https://byteguide-backend.onrender.com/api/plans', {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await response.json();
        console.log('Fetched plans:', data);
        setPlans(data);
      } catch (error) {
        console.error('Failed to fetch plans', error);
      }
    };

    checkAuth();
    fetchPlans();
  }, [navigate]);

  const handleSelectPlan = async (planName, amount, planId) => {
    console.log(`Selected plan: ${planName}`)
    setTimeout(() => {
      alert(`Redirecting to payment page for ${planName} plan`)
    }, 1000)

    try {
      const response = await fetch('https://byteguide-backend.onrender.com/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: amount * 100,
          currency: 'INR',
          receipt: planName
        }),
        credentials: 'include'
      });
      const data = await response.json();

      const options = {
        "key": "rzp_test_u9TppLpCedmShI",
        "amount": amount * 100,
        "currency": "INR",
        "name": "ByteGuide",
        "description": "Subscription Plan",
        "image": "frontend/byteguide/src/assets/logo.png",
        "order_id": data.id,
        "callback_url": "https://example.com/payment-callback",
        "prefill": {
          "name": "John Doe",
          "email": "user@example.com",
          "contact": "9999999999",
        },
        "notes": {
          "address": "Example Address",
        },
        "theme": {
          "color": "#F37254",
        },
      };
      await initializeRazorpay(options);
      console.log("userID:", userId);
      console.log("planId:", planId)
      const res = await fetch('https://byteguide-backend.onrender.com/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          planId
        }),
        credentials: 'include'
      });
    } catch (error) {
      console.error('Failed to create order', error);
      alert('Oops! Something went wrong. Payment failed.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradientStart to-gradientEnd py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-light sm:text-5xl md:text-6xl">
            Choose Your <span className="text-accent">Success Path</span>
          </h1>
          <p className="mt-4 text-xl text-light max-w-2xl mx-auto">
            Unlock your potential with our tailored subscription plans. Invest in your future today.
          </p>
        </div>

        <div className="mt-16 flex flex-col lg:flex-row justify-center items-center lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
      {plans && plans.length > 0 ? (
        plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={`w-full max-w-md lg:w-1/3 ${plan.popular ? 'lg:-mt-8 lg:mb-8' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className={`h-full flex flex-col rounded-3xl shadow-xl overflow-hidden ${plan.popular ? 'ring-4 ring-accent ring-opacity-50' : ''}`}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className={`p-8 ${plan.popular ? 'lg:p-10' : ''} bg-gradient-to-r ${plan.color}`}>
                <h3 className="text-3xl font-bold text-light">{plan.name}</h3>
                <p className="mt-4 flex items-baseline text-light">
                  <span className="text-5xl font-extrabold tracking-tight">₹{plan.price}</span>
                  <span className="ml-1 text-2xl font-medium">/month</span>
                </p>
                {plan.popular && (
                  <p className="mt-4 text-lg font-medium text-light flex items-center">
                    <Star className="h-5 w-5 mr-2 fill-current" /> Most Popular
                  </p>
                )}
              </div>
              <div className={`flex-1 bg-secondary p-8 ${plan.popular ? 'lg:p-10' : ''}`}>
                <ul className="space-y-4">
                  {(plan.features || []).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className={`h-6 w-6 ${plan.popular ? 'text-accent' : 'text-green-500'}`} />
                      </div>
                      <p className="ml-3 text-base text-light">{feature}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectPlan(plan.name, plan.price, plan._id)}
                    className={`w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-light ${
                      plan.popular
                        ? 'bg-accent hover:bg-accent-dark'
                        : `bg-gradient-to-r ${plan.color} hover:opacity-90`
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-200`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
    <p className="text-lg text-center text-light">Loading plans...</p>
  )}
</div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-light">
            Not sure which plan is right for you?
          </h3>
          <p className="mt-4 text-lg text-light max-w-2xl mx-auto">
            Our team of expert advisors is here to help you choose the perfect plan tailored to your academic goals and career aspirations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-light bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent-darker"
          >
            Schedule a Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}